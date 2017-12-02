'use strict';

import actionCardsList from '../data/actionCardsList';
import ActionCard from '../card-types/ActionCard';

let actionDeck = [];
for (let index = 0; index < actionCardsList.length; index += 1) {
	let challenge = actionCardsList[index].challenge;
	let stage = actionCardsList[index].stage;
	let traits = actionCardsList[index].traits;

	let currentCard = new ActionCard(challenge, stage, traits);

	actionDeck.push(currentCard);
}

export default actionDeck;