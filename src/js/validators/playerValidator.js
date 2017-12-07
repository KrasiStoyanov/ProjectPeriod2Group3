'use strict';

import { maxAmountOfCards } from '../constants/player';

function validateDuplicatingPlayerInstances (players, player, characterCard) {
	let isDuplicating = players.filter(player => player.name === characterCard.name);
	if (isDuplicating.length) {
		throw 'A player with that Name has already been added';
	}
}

function validatePlayerAmountOfCards (cardsInHand, amountOfNewCards) {
	if (amountOfNewCards <= 0) {
		return false;
	} else if (amountOfNewCards > maxAmountOfCards) {
		return false;
	}

	if (cardsInHand >= maxAmountOfCards) {
		return false;
	} else if (cardsInHand + amountOfNewCards > maxAmountOfCards) {
		return false;
	}

	return true;
}

export {
	validateDuplicatingPlayerInstances,
	validatePlayerAmountOfCards
};