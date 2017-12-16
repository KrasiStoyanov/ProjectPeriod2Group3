'use strict';

import * as playerConstants from '../constants/player';

/**
 * @function
 * @name hasDeckBeenDealt
 * @param { array } players - The list of players.
 * @param { object } player - The player.
 * @param { object } characterCard - The character of the player.
 * @description Check if the user selects the same character card twice and by this way creates duplicate instances of the class Player.
 */
function validateDuplicatingPlayerInstances (players, player, characterCard) {
	let isDuplicating = players.filter(player => player.characterCard.id === characterCard.id);
	if (isDuplicating.length) {
		throw 'A player with that Character has already been added';
	}
}

/**
 * @function
 * @name validateNumberOfPlayersSelected
 * @param { array } players - The list of players.
 * @description Check if the number of players is between the value of the constants.
 */
function validateNumberOfPlayersSelected (players) {
	if (players.length < playerConstants.minAmountOfPlayers || players.length > playerConstants.maxAmountOfPlayers) {
		throw `The number of players must be between ${playerConstants.minAmountOfPlayers} and ${playerConstants.maxAmountOfPlayers}`;
	}
}

/**
 * @function
 * @name validatePlayerAmountOfCards
 * @param { array } cardsInHand - The cards in the player's hand.
 * @param { number } amountOfNewCards - The amount of the new cards the player is going to receive.
 * @description Check if the number of cards the player has, plus the ones that he will receive, are in the constant boundries.
 */
function validatePlayerAmountOfCards (cardsInHand, amountOfNewCards) {
	if (amountOfNewCards <= 0) {
		return false;
	} else if (amountOfNewCards > playerConstants.maxAmountOfCards) {
		return false;
	}

	if (cardsInHand >= playerConstants.maxAmountOfCards) {
		return false;
	} else if (cardsInHand + amountOfNewCards > playerConstants.maxAmountOfCards) {
		return false;
	}

	return true;
}

export {
	validateDuplicatingPlayerInstances,
	validateNumberOfPlayersSelected,
	validatePlayerAmountOfCards
};