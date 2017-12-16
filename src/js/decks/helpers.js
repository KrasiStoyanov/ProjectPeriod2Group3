'use strict';

import * as deckValidator from '../validators/deckValidator';
import * as challengeCardConstants from '../constants/challengeCards';
import * as actionCardConstants from '../constants/actionCards';
import { getBoundriesOfStageIds } from '../decks/challengeDeck';

let randomId;
function getCard (deck, id) {
	for (let index = 0; index < deck.length; index += 1) {
		let currentCard = deck[index];
		if (currentCard.id === id) {
			return currentCard;
		}
	}
}


function dealDeck (deck, ...args) {
	if (args.length === 0) {
		deckValidator.hasDeckBeenDealt(deck);
		randomIdGenerator(deck, 0, deck.length);
	} else {
		let currentStage = args[0].stage;
		let boundriesOfStage = getBoundriesOfStageIds(currentStage);

		randomIdGenerator(deck, boundriesOfStage.minId, boundriesOfStage.maxId);
	}

	let randomCard = deck[randomId];
	deck.splice(randomId, 1);

	return randomCard;
}

function randomIdGenerator (deck, min, max) {
	randomId = Math.floor(Math.random() * (max - min) + min);
}

function removeCard (deck, id) {
	for (let index = 0; index < deck.length; index += 1) {
		let currentCard = deck[index];
		if (currentCard.id === id) {
			deck.splice(index, 1);
		}
	}
}

export {
	getCard,
	dealDeck,
	removeCard
};