
'use strict';

import * as playerInteraction from '../selection/playerInteraction';
import * as playerHelpers from '../player/helpers';
import { displayDeckCounter } from './actionDeck';
import { selectedPlayerImage, sidePlayerImageSize, name, sidePlayerRectangle } from '../constants/player';
import { generateActionCard } from './actionCards';

let fontProps = {
    font: '30px Karla',
    fill: '#fff'
};

let game;
let nameText;
let selectedPlayerGroup;
let cardGroup;
let listOfCardsGroup;
let playersGroup;
let traitsGroup;
let playerImage;

/**
 * @function
 * @name displaySelectedPlayer
 * @param { object } gameObject - The game object.
 * @description Display the selected.
 */
function displaySelectedPlayer (id, gameObject) {
	game = gameObject ? gameObject : game;
	selectedPlayerGroup = game.add.group();

	let player = playerHelpers.getPlayer(id);
	let playerName = player.name;

	playerHelpers.updateSelectedPlayer(id);

	nameText = game.add.text(name.margin.left, game.world.height - 50, playerName, fontProps);
	nameText.anchor.set(0);
	nameText.angle = -90;

	let playerImageY = game.world.height - selectedPlayerImage.height;
	playerImage = game.add.sprite(selectedPlayerImage.margin.left, playerImageY, playerName);
	playerImage.scale.setTo(selectedPlayerImage.height / playerImage.height);

	if (playerImage.width > selectedPlayerImage.width) {
		playerImage.scale.setTo(1);
		playerImageY = game.world.height - playerImage.height;

		playerImage.x = selectedPlayerImage.margin.left;
		playerImage.y = playerImageY;
	}

	selectedPlayerGroup.add(playerImage);
	selectedPlayerGroup.add(nameText);

	updateSelectedPlayerTraits();
	updateSelectedPlayerCards();

	game.world.add(selectedPlayerGroup);
}

/**
 * @function
 * @name displaySidePlayers
 * @param { object } gameObject - The game object.
 * @description Display side players.
 */
function displaySidePlayers (gameObject) {
	game = gameObject ? gameObject : game;

	let players = playerHelpers.getPlayers();
	playersGroup = game.add.group();

	for (let index = 0; index < players.length; index += 1) {
		let currentPlayer = players[index];
		let playerGroup = game.add.group();

		playerGroup.position.x = sidePlayerRectangle.margin.left;
		playerGroup.position.y = (sidePlayerRectangle.height * index) + sidePlayerRectangle.gutter * index;
		playerGroup.inputEnableChildren = true;

		if (!currentPlayer.isSelected) {
			let rectangle = new Phaser.Graphics(game, 0, 0);
			rectangle.beginFill(0xf0f0f0);
			rectangle.drawRoundedRect(0, 0, sidePlayerRectangle.width, sidePlayerRectangle.height, 15);
			rectangle.endFill();
			rectangle.events.onInputDown.add(() => updateSelectedPlayer(currentPlayer), this);

			let imageMarginLeft = sidePlayerRectangle.width / 2;
			let imageMarginTop = sidePlayerRectangle.height / 2;
			let playerImage = game.add.sprite(imageMarginLeft, imageMarginTop, currentPlayer.name);

			playerImage.anchor.set(0.5, 0.5);
			playerImage.scale.setTo(sidePlayerImageSize.height / playerImage.height);

			playerImage.inputEnabled = true;
			playerImage.events.onInputDown.add(() => updateSelectedPlayer(currentPlayer), this);

			playerGroup.add(rectangle);
			playerGroup.add(playerImage);
		}

		playersGroup.add(playerGroup);
	}
}

/**
 * @function
 * @name updateSelectedPlayer
 * @param { object } player - The clicked player.
 * @description Update the selected player.
 */
function updateSelectedPlayer (player) {
	playerHelpers.updateSelectedPlayer(player.id);
	selectedPlayerGroup.removeAll(true);

	updateSidePlayers();
	displaySelectedPlayer(player.id);
}

/**
 * @function
 * @name updateSidePlayers
 * @description Update side players.
 */
function updateSidePlayers () {
	playersGroup = playersGroup ? playersGroup : game.add.group();
	playersGroup.removeAll(true);

	displaySidePlayers();
}

/**
 * @function
 * @name displaySelectedPlayerCards
 * @description Display the cards of the selected player.
 */
function displaySelectedPlayerCards () {
	let selectedPlayer = playerHelpers.getSelectedPlayer();
	let cardsInHand = selectedPlayer.cardsInHand;
	listOfCardsGroup = game.add.group();

	for (let index in cardsInHand) {
		let currentCard = cardsInHand[index];
		let traits = currentCard.traits;
		cardGroup = game.add.group();

		generateActionCard(currentCard, game);

		cardGroup.inputEnableChildren = true;
		for (let jndex in traits) {
			let currentTrait = traits[jndex];
			let traitFontProps = {
				font: '18px Karla',
				fill: 'rgba(255, 255, 255, .7)'
			};

			let traitText = game.add.text((150 * index) + 50, 650 + (50 * jndex), `${currentTrait.name}: ${currentTrait.value}`, traitFontProps);

			traitText.events.onInputDown.add(() => playerInteraction.onActionCardClick(selectedPlayer, currentCard), this);
			cardGroup.add(traitText);
		}

		listOfCardsGroup.add(cardGroup);
	}
}

/**
 * @function
 * @name updateSelectedPlayerCards
 * @description Update selected player cards.
 */
function updateSelectedPlayerCards () {
	listOfCardsGroup = listOfCardsGroup ? listOfCardsGroup : game.add.group();
	listOfCardsGroup.removeAll(true);

	displaySelectedPlayerCards();
}

/**
 * @function
 * @name displaySelectedPlayerTraits
 * @description Display selected player traits.
 */
function displaySelectedPlayerTraits () {
	let selectedPlayer = playerHelpers.getSelectedPlayer();
	let traits = selectedPlayer.traits;
	traitsGroup = game.add.group();

	const fontProps = {
		font: '18px Karla',
		fill: '#333333'
	};

	const traitIconSize = 35;
	const textMarginLeft = 15;
	const groupMarginLeft = 25;
	let previousGroupWidths = 0;
	for (let index in traits) {
		index = parseInt(index);
		let currentTrait = traits[index];
		let traitGroup = game.add.group();
		let traitIcon;
		if (currentTrait.value > 0) {
			traitIcon = game.add.sprite(0, 0, 'positiveTraits');
		} else {
			traitIcon = game.add.sprite(0, 0, 'negativeTraits');
		}

		let traitText = game.add.text(traitIconSize + textMarginLeft, 10, currentTrait.value, fontProps);

		traitIcon.frame = index;
		traitGroup.add(traitIcon);
		traitGroup.add(traitText);
		traitGroup.left = previousGroupWidths;

		previousGroupWidths += traitGroup.width + groupMarginLeft;
		traitsGroup.add(traitGroup);
	}

	let worldBottomPosition = game.world.height;
	let worldLeftPosition = 0;
	const marginBottom = 215;
	const marginLeft = 340;

	traitsGroup.bottom = worldBottomPosition - marginBottom;
	traitsGroup.left = worldLeftPosition + marginLeft;
}

/**
 * @function
 * @name displaySelectedPlayerTraits
 * @description Update selected player traits.
 */
function updateSelectedPlayerTraits () {
	traitsGroup = traitsGroup ? traitsGroup : game.add.group();
	traitsGroup.removeAll(true);

	displaySelectedPlayerTraits();
}

export {
	displaySelectedPlayer,
	displaySidePlayers,
	updateSelectedPlayerCards
}