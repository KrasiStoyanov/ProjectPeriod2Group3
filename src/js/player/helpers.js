'use strict';

import Player from './Player';
import * as playerValidator from '../validators/playerValidator';
import * as playerConstants from '../constants/player';
import { updateDeckCounter } from '../render/actionDeck';


let players = [];
let selectedPlayer;

/**
 * @function
 * @name addPlayer
 * @param { object } characterCard - The character card that the player has chosen.
 * @return { object } The player.
 * @description Create a new instance of the class Player.
 */
function addPlayer (characterCard) {
	let player = new Player(characterCard);
	playerValidator.validateDuplicatingPlayerInstances(players, player, characterCard);

	players.push(player);

	return player;
}

/**
 * @function
 * @name getPlayers
 * @return { array } The list of all the players.
 */
function getPlayers () {
	let immutableList = Object.assign([], players);

	return immutableList;
}

/**
 * @function
 * @name getPlayer
 * @param { number } id - The id of the player.
 * @return { object } The player.
 */
function getPlayer (id) {
	let player = players.filter(p => p.id === id)[0];

	return player;
}

/**
 * @function
 * @name amountOfCardsToBeInitiallyDealt
 * @return { number } The amount of cards that all the players need to have when the game starts.
 */
function amountOfCardsToBeInitiallyDealt () {
	if (players.length === 3) {
		return playerConstants.maxAmountOfCardsInitial;
	} else if (players.length > 3) {
		return playerConstants.minAmountOfCardsInitial;
	}
}

/**
 * @function
 * @name updateSelectedPlayer
 * @description Update the selected player.
 */
function updateSelectedPlayer (id) {
	for (let index = 0; index < players.length; index += 1) {
		let currentPlayer = players[index];

		if (currentPlayer.id === id) {
			currentPlayer.isSelected = true;

			selectedPlayer = currentPlayer;
		} else {
			currentPlayer.isSelected = false;
		}
	}
}

/**
 * @function
 * @name getSelectedPlayer
 * @return { object } The selected player.
 * @description Receive the selected player.
 */
function getSelectedPlayer () {
	return selectedPlayer;
}

/**
 * @function
 * @name getSidePlayers
 * @return { array } The side players.
 * @description Receive the side players.
 */
function getSidePlayers () {
	let sidePlayers = [];
	for (let index in players) {
		let currentPlayer = players[index];
		if (!currentPlayer.isSelected) {
			sidePlayers.push(currentPlayer);
		}
	}

	return sidePlayers;
}

/**
 * @function
 * @name playersReceiveCardsAfterChallenge
 * @description Player should receive a card after passing/failing a challenge.
 */
function playersReceiveCardsAfterChallenge () {
	for (let index = 0; index < players.length; index += 1) {
		let currentPlayer = players[index];
		currentPlayer.giftingCounter = 0;

		currentPlayer.receiveCards(1);
		updateDeckCounter();
	}
}

/**
 * @function
 * @name giftActionCard
 * @description Gift the action card to the chosen player.
 */
function giftActionCard (card, playerId) {
	let receivingPlayer = getPlayer(playerId);
	
	card.playerId = receivingPlayer.id;
	receivingPlayer.cardsInHand.push(card);
}

/**
 * @function
 * @name suitablePlayersSuggestion
 * @return { array } The suitable players.
 * @description Detect all suitable players to receive the gifted card.
 */
function suitablePlayersSuggestion (card) {
	let suitablePlayers = [];
	let cardTraits = card.traits;
	let currentChallengeTrait = currentChallenge.traits[0];

	for (let index = 0; index < players.length; index += 1) {
		let currentPlayer = players[index];
		let playerTraits = currentPlayer.traits;
		for (let jndex = 0; jndex < cardTraits.length; jndex += 1) {
			for (let key in playerTraits) {
				let trait = playerTraits[key];
				let ifArrayContainsCurrentPlayer = ifSuitablePlayersContainCurrentPlayer(suitablePlayers, currentPlayer);
				if (currentPlayer.id !== selectedPlayer.id && !ifArrayContainsCurrentPlayer) {
					if (trait.name === currentChallengeTrait.name) {
						if (trait.value > 0) {
							suitablePlayers.push(currentPlayer);

							break;
						}
					}
				}
			}
		}
	}

	return suitablePlayers;
}

/**
 * @function
 * @name ifSuitablePlayersContainCurrentPlayer
 * @return { boolean } If player is already in array.
 * @description Check if player is already in the array of suitable players.
 */
function ifSuitablePlayersContainCurrentPlayer (suitablePlayers, player) {
	for (let index = 0; index < suitablePlayers.length; index += 1) {
		let currentPlayer = suitablePlayers[index];
		if (currentPlayer.id === player.id) {
			return true;
		}
	}

	return false;
}

export {
	addPlayer,
	getPlayers,
	getPlayer,
	amountOfCardsToBeInitiallyDealt,
	updateSelectedPlayer,
	getSelectedPlayer,
	getSidePlayers,
	playersReceiveCardsAfterChallenge,
	giftActionCard,
	suitablePlayersSuggestion
}