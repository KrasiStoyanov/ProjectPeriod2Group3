'use strict';

import * as deckValidator from '../validators/deckValidator';
import { getBoundriesOfStageIds } from '../decks/challengeDeck';

let randomId;

/**
 * @function
 * @name getCard
 * @param { array } deck - The deck.
 * @oaram { number } id - The id of the card.
 * @return { object } The card.
 */
function getCard (deck, id) {
	for (let index = 0; index < deck.length; index += 1) {
		let currentCard = deck[index];
		if (currentCard.id === id) {
			return currentCard;
		}
	}
}

/**
 * @function
 * @name dealDeck
 * @param { array } deck - The deck.
 * @param { array } args - If anything more is bassed, save it in an array for later processing.
 * @return { object } The random card that is dealt.
 * @description Randomly deal a card from a given deck.
 */
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

/**
 * @function
 * @name randomIdGenerator
 * @param { array } deck - The deck.
 * @oaram { number } min - The lowest id.
 * @oaram { number } max - The highest id.
 * @description Generate a random ID based on the boundry provided in the args
 */
function randomIdGenerator (deck, min, max) {
	randomId = Math.floor(Math.random() * (max - min) + min);
}

/**
 * @function
 * @name removeCard
 * @param { array } deck - The deck.
 * @oaram { number } id - The id of the card.
 */
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