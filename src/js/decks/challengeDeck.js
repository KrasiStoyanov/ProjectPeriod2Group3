'use strict';

import challengeCardsList from '../data/challengeCardsList';
import ChallengeCard from '../card-types/ChallengeCard';

let challengeDeck = [];
for (let index = 0; index < challengeCardsList.length; index += 1) {
	let challenge = challengeCardsList[index].challenge;
	let stage = challengeCardsList[index].stage;
	let traits = challengeCardsList[index].traits;

	let currentCard = new ChallengeCard(challenge, stage, traits);

	challengeDeck.push(currentCard);
}

export default challengeDeck;