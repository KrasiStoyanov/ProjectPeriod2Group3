'use strict';

import characterSelection from '../selection/characterSelection';
import * as playerInteraction from '../selection/playerInteraction';
import { firstPlayerToStartId } from '../constants/player';
import * as playerHelpers from '../player/helpers';
import { dealChallenge } from '../challenges/stages';
import * as playersRender from '../render/players';

let mainScreen = {
	/**
	 * @function
	 * @name create
	 * @param { object } game - The game object.
	 * @description This is the place where the main play screen is displayed and manipulated.
	 */
	create: (game) => {
		// TODO: create main screen using the layot
		let players = playerHelpers.getPlayers();
		let amountOfCardsToBeInitiallyDealt = playerHelpers.amountOfCardsToBeInitiallyDealt();
		for (let index = 0; index < amountOfCardsToBeInitiallyDealt; index += 1) {
			for (let jndex = 0; jndex < players.length; jndex += 1) {
				let player = players[jndex];

				player.receiveCards(1);
			}
		}

		let firstPlayerToStart = playerHelpers.getPlayer(firstPlayerToStartId);
		let listOfCards = firstPlayerToStart.cardsInHand;

		firstPlayerToStart.isSelected = true;
		playersRender.displaySelectedPlayer(game, firstPlayerToStartId);
		playersRender.displaySidePlayers(game);

		let currentChallenge = dealChallenge();
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