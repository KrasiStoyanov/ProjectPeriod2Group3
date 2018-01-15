'use strict';

import characterSelection from '../selection/characterSelection';
import * as playerInteraction from '../selection/playerInteraction';
import { firstPlayerToStartId } from '../constants/player';
import * as playerHelpers from '../player/helpers';
import { dealChallenge } from '../challenges/stages';
import * as playersRender from '../render/players';
import { displayChallenge } from '../render/challenges';
import { displayDeck, displayDeckCounter, updateDeckCounter} from '../render/actionDeck';

let mainScreen = {
	/**
	 * @function
	 * @name create
	 * @param { object } game - The game object.
	 * @description This is the place where the main play screen is displayed and manipulated.
	 */
	create: (game) => {
		let players = playerHelpers.getPlayers();
		let amountOfCardsToBeInitiallyDealt = playerHelpers.amountOfCardsToBeInitiallyDealt();

		displayDeckCounter(game);

		for (let index = 0; index < amountOfCardsToBeInitiallyDealt; index += 1) {
			for (let jndex = 0; jndex < players.length; jndex += 1) {
				let player = players[jndex];

				player.receiveCards(1);
				
				updateDeckCounter(game);
			}
		}

		let firstPlayerToStart = playerHelpers.getPlayer(firstPlayerToStartId);
		let listOfCards = firstPlayerToStart.cardsInHand;

		playerHelpers.updateSelectedPlayer(firstPlayerToStartId);
		playersRender.displaySelectedPlayer(firstPlayerToStartId, game);
		playersRender.displaySidePlayers(game);

		let currentChallenge = dealChallenge();
		displayChallenge(game);
		
		displayDeck(game);
	},
	/**
	 * @function
	 * @name win
	 * @param { object } game - The game object.
	 * @description After finishing the game go to next state.
	 */
	win: (game) => {
		game.state.start('win');
	}
};

export default mainScreen;