'use strict';

import * as deckValidator from '../validators/deckValidator';

let min = 0;
let max = 21;
function getCard (deck, id) {
	for (let index = 0; index < deck.length; index += 1) {
		let currentCard = deck[index];
		if (currentCard.id === id) {
			return currentCard;
		}
	}
}

function dealDeck (deck) {
	let isDone = false;
	let randomId;

	deckValidator.hasDeckBeenDealt(deck);
	while (!isDone) {
		randomId = Math.floor(Math.random() * (max - min) + min);
		let hasFoundCard = deck.filter(card => card.id === randomId);
		if (hasFoundCard.length > 0) {
			isDone = true;
		}
	}

	let randomCard = getCard(deck, randomId);
	removeCard(deck, randomId);

	return randomCard;
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