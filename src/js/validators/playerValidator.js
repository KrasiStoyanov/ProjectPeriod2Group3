'use strict';

import * as playerConstants from '../constants/player';

function validateDuplicatingPlayerInstances (players, player, characterCard) {
	let isDuplicating = players.filter(player => player.characterCard.id === characterCard.id);
	if (isDuplicating.length) {
		throw 'A player with that Character has already been added';
	}
}

function validateNumberOfPlayersSelected (players) {
	if (players.length < playerConstants.minAmountOfPlayers || players.length > playerConstants.maxAmountOfPlayers) {
		throw `The number of players must be between ${playerConstants.minAmountOfPlayers} and ${playerConstants.maxAmountOfPlayers}`;
	}
}

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