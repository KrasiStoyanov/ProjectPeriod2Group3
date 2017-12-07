'use strict';

function getCard (deck, id) {
	for (let index = 0; index < deck.length; index += 1) {
		let currentCard = deck[index];
		if (currentCard.id === id) {
			return currentCard;
		}
	}
}

function getTopCard (deck) {
	let topCard =  deck[deck.length - 1];

	return topCard;
}

function removeTopCard (deck) {
	deck.pop();
}

export {
	getCard,
	getTopCard,
	removeTopCard
};