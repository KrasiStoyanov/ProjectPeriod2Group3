
'use strict';

import * as playerInteraction from '../selection/playerInteraction';
import * as playerHelpers from '../player/helpers';

let fontProps = {
    font: '24px Karla',
    fill: '#fff'
};

let game;
let nameText;
let selectedPlayerGroup;
let cardGroup;
let listOfCardsGroup;
let playersGroup;
let traitsGroup;

/**
 * @function
 * @name displaySelectedPlayer
 * @param { object } gameObject - The game object.
 * @description Display the selected.
 */
function displaySelectedPlayer (gameObject, id) {
	game = gameObject;
	selectedPlayerGroup = game.add.group();

	let player = playerHelpers.getPlayer(id);
	let playerName = player.name;

	playerHelpers.updateSelectedPlayer(id);

	nameText = game.add.text(50, 600, playerName, fontProps);
	selectedPlayerGroup.add(nameText);

	displaySelectedPlayerTraits();
	displaySelectedPlayerCards();

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
		if (!currentPlayer.isSelected) {
			let nameText = game.add.text(50, 50 * index, currentPlayer.name, fontProps);

    		nameText.inputEnabled = true;
			nameText.events.onInputDown.add(() => updateSelectedPlayer(currentPlayer), this);
			playersGroup.add(nameText);
		}
	}
}

/**
 * @function
 * @name updateSelectedPlayer
 * @param { object } player - The clicked player.
 * @description Update the selected player.
 */
function updateSelectedPlayer (player) {
	let playerName = player.name;

	listOfCardsGroup.removeAll(true);
	playerHelpers.updateSelectedPlayer(player.id);

	updateSelectedPlayerCards();
	updateSelectedPlayerTraits();
	nameText.setText(playerName);

	updateSidePlayers();
}

/**
 * @function
 * @name updateSidePlayers
 * @description Update side players.
 */
function updateSidePlayers () {
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
	traitsGroup.removeAll(true);

	displaySelectedPlayerTraits();
}

export {
	displaySelectedPlayer,
	displaySidePlayers,
	updateSelectedPlayerCards
}