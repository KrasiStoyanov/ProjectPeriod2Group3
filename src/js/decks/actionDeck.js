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

function dealDeck () {
	let card = helpers.dealDeck(actionDeck);

	return card;
}

function removeCard (id) {
	helpers.removeCard(actionDeck, id);
}

export {
	getDeck,
	getCard,
	dealDeck,
	removeCard
};