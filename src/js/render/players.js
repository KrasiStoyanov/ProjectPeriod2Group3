'use strict';

import * as playerInteraction from '../selection/playerInteraction';
import * as playerHelpers from '../player/helpers';
import { displayDeckCounter } from './actionDeck';
import { selectedPlayerImage, sidePlayerImageSize, name, sidePlayerRectangle } from '../constants/player';
import { displayTabSystem, updateTabSystem, getBounds } from './tabSystem';

let fontProps = {
    font: '30px Karla',
    fill: '#00000'
};

let sidePlayerNumberProps = {
    font: '12px Karla',
    fill: '#131313'
};

let game;
let nameText;
let selectedPlayerGroup;
let cardGroup;
let listOfCardsGroup;
let playersGroup;
let traitsGroup;
let playerImage;
let selectedPlayerBackground;
let sidePlayersBackground;

/**
 * @function
 * @name displaySelectedPlayer
 * @param { Phaser.Game } gameObject - The game object.
 * @description Display the selected player.
 */
function displaySelectedPlayer (id, gameObject) {
	game = gameObject ? gameObject : game;
	
	let player = playerHelpers.getPlayer(id);
	let playerName = player.name;

	selectedPlayerGroup = game.add.group();

	playerHelpers.updateSelectedPlayer(id);

	updateSelectedPlayerTraits();
	updateSelectedPlayerCards();

	let tabSystemBounds = getBounds();
	let nameTextX = tabSystemBounds.left - name.margin.right;
	let nameTextY = game.world.height - 50;

	nameText = game.add.text(nameTextX, nameTextY, playerName, fontProps);
	nameText.anchor.set(0, 1);
	nameText.angle = -90;

	let playerImageX = selectedPlayerImage.margin.left;
	let playerImageY = game.world.height - selectedPlayerImage.height;

	playerImage = game.add.sprite(playerImageX, playerImageY, playerName);
	playerImage.scale.setTo(selectedPlayerImage.height / playerImage.height);

	if (playerImage.width > selectedPlayerImage.width) {
		playerImage.scale.setTo(1);
		playerImageY = game.world.height - playerImage.height;

		playerImage.x = selectedPlayerImage.margin.left;
		playerImage.y = playerImageY;
	}

	let backgroundX = 0;
	let backgroundY = traitsGroup.top - 20;
	let backgroundWidth = game.width;
	let backgroundHeight = game.height - backgroundY;

	selectedPlayerBackground = new Phaser.Graphics(game, 0, game.worldBottomPosition);
	selectedPlayerBackground.beginFill(0xffffff);
	selectedPlayerBackground.drawRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
	selectedPlayerBackground.endFill();

	selectedPlayerGroup.add(selectedPlayerBackground);
	selectedPlayerGroup.add(playerImage);
	selectedPlayerGroup.add(nameText);
	game.world.add(selectedPlayerGroup);
}

/**
 * @function
 * @name displaySidePlayers
 * @param { Phaser.Game } gameObject - The game object.
 * @description Display side players.
 */
function displaySidePlayers (gameObject) {
	game = gameObject ? gameObject : game;

	let players = playerHelpers.getSidePlayers();

	playersGroup = game.add.group();
	playersGroup.x = 34;
	playersGroup.y = 0;

	let backgroundX = 0;
	let backgroundY = 0;
	let backgroundWidth = sidePlayerRectangle.width + (sidePlayerRectangle.gutter * 2);
	let backgroundHeight = game.height;

	sidePlayersBackground = new Phaser.Graphics(game,0,0);
	sidePlayersBackground.beginFill(0x00000);
	sidePlayersBackground.drawRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
	sidePlayersBackground.endFill();

	playersGroup.add(sidePlayersBackground);

	for (let index = 0; index < players.length; index += 1) {
		let currentPlayer = players[index];
		let playerGroup = game.add.group();

		playerGroup.x = sidePlayerRectangle.margin.left;
		playerGroup.y = (sidePlayerRectangle.height * index) + (sidePlayerRectangle.gutter * (index + 1));
		playerGroup.inputEnableChildren = true;

		if (!currentPlayer.isSelected) {
			let rectangle = new Phaser.Graphics(game, 0, 0);

			rectangle.beginFill(0xffffff);
			rectangle.drawRoundedRect(0, 0, sidePlayerRectangle.width, sidePlayerRectangle.height, 15);
			rectangle.endFill();
			rectangle.events.onInputDown.add(() => updateSelectedPlayer(currentPlayer), this);
			
			let playerNumber = game.add.text(10, 10, currentPlayer.id + 1, sidePlayerNumberProps);

			let imageMarginLeft = sidePlayerRectangle.width / 2;
			let imageMarginTop = sidePlayerRectangle.height / 2;
			let playerImage = game.add.sprite(imageMarginLeft, imageMarginTop, currentPlayer.name);

			playerImage.anchor.set(0.5, 0.5);
			playerImage.scale.setTo(sidePlayerImageSize.height / playerImage.height);

			playerImage.inputEnabled = true;
			playerImage.events.onInputDown.add(() => updateSelectedPlayer(currentPlayer), this);

			let position = {
				x: playerGroup.x,
				y: playerGroup.y
			};

			playerGroup.add(rectangle);
			playerGroup.add(playerNumber);
			playerGroup.add(playerImage);
			playerGroup.variable = position;
			playerGroup.playerId = currentPlayer.id;
		}
		
		playersGroup.add(playerGroup);
	}
}

/**
 * @function
 * @name getSidePlayersGroup
 * @return { Phaser.Group } The side players group.
 * @description Get the side players group.
 */
function getSidePlayersGroup () {
	return playersGroup;
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
	displayTabSystem(1);
}

/**
 * @function
 * @name updateSelectedPlayerCards
 * @description Update selected player cards.
 */
function updateSelectedPlayerCards () {
	updateTabSystem(game);
	// displaySelectedPlayerCards();
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
	const marginLeft = 380;

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
	updateSelectedPlayerCards,
	getSidePlayersGroup
}