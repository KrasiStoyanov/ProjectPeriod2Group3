'use strict';

import characterSelection from '../selection/characterSelection';
import * as playerInteraction from '../selection/playerInteraction';
import { firstPlayerToStartId, selectedPlayerTraits, sidePlayerRectangle, sidePlayers } from '../constants/player';
import * as playerHelpers from '../player/helpers';
import { dealChallenge } from '../challenges/stages';
import * as playersRender from '../render/players';
import { displayChallenge } from '../render/challenges';
import { displayDeck, displayDeckCounter, updateDeckCounter } from '../render/actionDeck';
import { displayTabSystem } from '../render/tabSystem';
import { displayProgressBar } from '../render/progressBar';
import * as tabSystemConstants from '../constants/tabSystem';

let mainScreen = {
	/**
	 * @function
	 * @name create
 	 * @param { Phaser.Game } gameObject - The game object.
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

		let currentChallenge = dealChallenge();
		displayChallenge(game);
		
		displayDeck(game);

		let sideBackgroundX = sidePlayers.margin.left;
		let sideBackgroundY = 0;
		let sideBackgroundWidth = sidePlayerRectangle.width + (sidePlayerRectangle.gutter * 2);
		let sideBackgroundHeight = game.height;

		let sidePlayersBackground = game.add.graphics(0, 0);
		sidePlayersBackground.beginFill(0x00000);
		sidePlayersBackground.drawRect(sideBackgroundX, sideBackgroundY, sideBackgroundWidth, sideBackgroundHeight);
		sidePlayersBackground.endFill();

		let selectedBackgroundX = 0;
		let selectedBackgroundY = game.world.height - (selectedPlayerTraits.icon.size + selectedPlayerTraits.margin.bottom + selectedPlayerTraits.margin.top + tabSystemConstants.size.height);
		let selectedBackgroundWidth = game.width;
		let selectedBackgroundHeight = game.height - selectedBackgroundY;

		let selectedPlayerBackground = game.add.graphics(0, game.worldBottomPosition);
		selectedPlayerBackground.beginFill(0xffffff);
		selectedPlayerBackground.drawRect(selectedBackgroundX, selectedBackgroundY, selectedBackgroundWidth, selectedBackgroundHeight);
		selectedPlayerBackground.endFill();
		
		playerHelpers.updateSelectedPlayer(firstPlayerToStartId);
		playersRender.displaySidePlayers(game);
		playersRender.displaySelectedPlayer(firstPlayerToStartId, game);
		
		displayProgressBar(game);
	},
	
	/**
	 * @function
	 * @name win
 	 * @param { Phaser.Game } gameObject - The game object.
	 * @description After finishing the game go to next state.
	 */
	win: (game) => {
		game.state.start('win');
	}
};

export default mainScreen;