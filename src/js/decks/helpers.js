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
	let randomId;

	deckValidator.hasDeckBeenDealt(deck);
	
	randomId = Math.floor(Math.random() * deck.length);

	let randomCard = deck[randomId];
	deck.splice(randomId,1);

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