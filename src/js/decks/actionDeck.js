'use strict';

import actionCardsList from '../data/actionCardsList';
import ActionCard from '../card-types/ActionCard';
import * as helpers from './helpers';

let actionDeck = [];

/** Add every card from the data file to the new actionDeck array. */
for (let index = 0; index < actionCardsList.length; index += 1) {
	let action = actionCardsList[index].action;
	let traits = actionCardsList[index].traits;

	let currentCard = new ActionCard(action, traits);

	actionDeck.push(currentCard);
}

/**
 * @function
 * @name getDeck
 * @return { array } The action deck.
 */
function getDeck () {
	return actionDeck;
}

/**
 * @function
 * @name dealDeck
 * @return { object } The card that is dealt.
 */
function dealDeck () {
	let card = helpers.dealDeck(actionDeck);

	return card;
}

/**
 * @function
 * @name getCard
 * @oaram { number } id - The id of the card.
 * @return { object } The card.
 */
function getCard (id) {
	let card = helpers.getCard(actionDeck, id);

	return card;
}

/**
 * @function
 * @name removeCard
 * @oaram { number } id - The id of the card.
 */
function removeCard (id) {
	helpers.removeCard(actionDeck, id);
}

export {
	getDeck,
	getCard,
	dealDeck,
	removeCard
};