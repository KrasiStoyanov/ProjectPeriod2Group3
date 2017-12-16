'use strict';

import characterSelection from '../selection/characterSelection';
import * as playerInteraction from '../selection/playerInteraction';
import { firstPlayerToStartId } from '../constants/player';
import * as playerHelper from '../player/helpers';
import { dealChallenge } from '../challenges/stages';

let mainScreen = {
	create: (game) => {
		// TODO: create main screen using the layot
		let players = playerHelper.getPlayers();
		let amountOfCardsToBeInitiallyDealt = playerHelper.amountOfCardsToBeInitiallyDealt();
		for (let index = 0; index < amountOfCardsToBeInitiallyDealt; index += 1) {
			for (let jndex = 0; jndex < players.length; jndex += 1) {
				let player = players[jndex];

				player.receiveCards(1);
			}
		}

		// Display player and list of cards
		let fontProps = {
	        font: '18px Karla',
	        fill: '#fff',
	        boundsAlignH: 'center',
	        boundsAlignV: 'middle'
	    };

		let firstPlayerToStart = playerHelper.getPlayer(firstPlayerToStartId);
		let listOfCards = firstPlayerToStart.cardsInHand;
		for (let index = 0; index < listOfCards.length; index += 1) {
			let text;
			let currentCard = listOfCards[index];
			for (let jndex = 0; jndex < currentCard.traits.length; jndex += 1) {
				let currentTrait = currentCard.traits[jndex];
				if (jndex === 0) {
					text = game.add.text(100, index * 100, currentTrait.name + ': ' + currentTrait.value, fontProps);
				} else {
					text = game.add.text(300, index * 100, currentTrait.name + ': ' + currentTrait.value, fontProps);
				}

				text.inputEnabled = true;
				text.events.onInputDown.add(() => playerInteraction.onActionCardClick(firstPlayerToStart, currentCard), this);
			}
		}

		let currentChallenge = dealChallenge();
	},
	win: (game) => {
		game.state.start('win');
	},
	lose: (game) => {
		game.state.start('lose');
	}
};

export default mainScreen;