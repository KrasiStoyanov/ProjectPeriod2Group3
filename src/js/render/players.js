
'use strict';

import * as playerInteraction from '../selection/playerInteraction';
import * as playerHelpers from '../player/helpers';

let fontProps = {
    font: '24px Karla',
    fill: '#fff'
};

function displaySelectedPlayer (game, id) {
	let player = playerHelpers.getPlayer(id);
	let playerName = player.name;
	let selectedPlayerGroup = game.add.group();

	let nameText = game.add.text(50, 600, playerName, fontProps);
	let cardsInHand = player.cardsInHand;
	let listOfCardsGroup = game.add.group();

	for (let index in cardsInHand) {
		let currentCard = cardsInHand[index];
		let traits = currentCard.traits;
		let cardGroup = game.add.group();

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

	selectedPlayerGroup.add(nameText);

	game.world.add(selectedPlayerGroup);
}

function displaySidePlayers (game) {
	let players = playerHelpers.getPlayers();
	let playersGroup = game.add.group();
	for (let index in players) {
		let currentPlayer = players[index];
		if (!currentPlayer.isSelected) {
			let nameText = game.add.text(50, 50 * index, currentPlayer.name, fontProps);

			playersGroup.add(nameText);
		}
	}
}

export {
	displaySelectedPlayer,
	displaySidePlayers
}