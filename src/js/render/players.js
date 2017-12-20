
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

function displaySelectedPlayer (gameObject, id) {
	console.log(playerHelpers.getPlayers());
	game = gameObject;

	let players = playerHelpers.getPlayers();
	playerHelpers.updateSelectedPlayer(id);

	let player = playerHelpers.getPlayer(id);

	let playerName = player.name;
	selectedPlayerGroup = game.add.group();

	nameText = game.add.text(50, 600, playerName, fontProps);
	selectedPlayerGroup.add(nameText);

	displaySelectedPlayerCards(player);

	game.world.add(selectedPlayerGroup);
}

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

function updateSelectedPlayer (player) {
	let playerName = player.name;
	console.log(player.id, player.cardsInHand);

	listOfCardsGroup.removeAll(true);
	playerHelpers.updateSelectedPlayer(player.id);

	displaySelectedPlayerCards(player);
	nameText.setText(playerName);

	updateSidePlayers();
}

function updateSidePlayers () {
	playersGroup.removeAll();

	displaySidePlayers();
}

function displaySelectedPlayerCards (player) {
	let cardsInHand = player.cardsInHand;
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

			traitText.events.onInputDown.add(() => playerInteraction.onActionCardClick(player, currentCard), this);
			cardGroup.add(traitText);
		}

		listOfCardsGroup.add(cardGroup);
	}
}

export {
	displaySelectedPlayer,
	displaySidePlayers
}