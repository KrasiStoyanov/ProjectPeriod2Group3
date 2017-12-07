'use strict';

import actionCardsList from '../data/actionCardsList';
import ActionCard from '../card-types/ActionCard';
import * as helpers from './helpers';

let actionDeck = [];
for (let index = 0; index < actionCardsList.length; index += 1) {
	let action = actionCardsList[index].action;
	let traits = actionCardsList[index].traits;

	let currentCard = new ActionCard(action, traits);

	actionDeck.push(currentCard);
}

function getDeck () {
	return actionDeck;
}

function getCard (id) {
	let card = helpers.getCard(actionDeck, id);

	return card;
}

function getTopCard () {
	let card = helpers.getTopCard(actionDeck);

	return card;
}

function removeTopCard (id) {
	helpers.removeTopCard(actionDeck);
}

export {
	getDeck,
	getCard,
	getTopCard,
	removeTopCard
};