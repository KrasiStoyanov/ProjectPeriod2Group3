'use strict';

import actionCardsList from '../data/actionCardsList';
import ActionCard from '../card-types/ActionCard';

let actionDeck = [];
for (let index = 0; index < actionCardsList.length; index += 1) {
	let action = actionCardsList[index].action;
	let traits = actionCardsList[index].traits;

	let currentCard = new ActionCard(action, traits);

	actionDeck.push(currentCard);
}

export default actionDeck;