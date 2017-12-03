'use strict';

function getCard (deck, id) {
	for (let index = 0; index < deck.length; index += 1) {
		let currentCard = deck[index];
		if (currentCard.id === id) {
			return currentCard;
		}
	}
}

export {
	getCard
};