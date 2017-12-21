'use strict';

import challengeCardsList from '../data/challengeCardsList';
import ChallengeCard from '../card-types/ChallengeCard';
import * as helpers from './helpers';

let challengeDeck = [];

/** Add every card from the data file to the new challengeDeck array. */
for (let index = 0; index < challengeCardsList.length; index += 1) {
	let challenge = challengeCardsList[index].challenge;
	let stage = challengeCardsList[index].stage;
	let traits = challengeCardsList[index].traits;

	let currentCard = new ChallengeCard(challenge, stage, traits);

	challengeDeck.push(currentCard);
}

/**
 * @function
 * @name getDeck
 * @return { array } The challenge deck.
 */
function getDeck () {
	return challengeDeck;
}

/**
 * @function
 * @name dealDeck
 * @return { object } The card that is dealt.
 */
function dealDeck (stage) {
	let card = helpers.dealDeck(challengeDeck, { stage });

	return card;
}

/**
 * @function
 * @name getCard
 * @oaram { number } id - The id of the card.
 * @return { object } The card.
 */
function getCard (id) {
	let card = helpers.getCard(challengeDeck, id);

	return card;
}

/**
 * @function
 * @name removeCard
 * @oaram { number } id - The id of the card.
 */
function removeCard (id) {
	helpers.removeCard(challengeDeck, id);
}

/**
 * @function
 * @name getBoundriesOfStageIds
 * @oaram { string } stage - The stage of the challenge.
 * @description Go through every challenge in the challenge deck and set the boundries of each stage represented by IDs.
 */
function getBoundriesOfStageIds (stage) {
	let minId = 0;
	let maxId = 0;
	for (let index = 1; index < challengeDeck.length; index += 1) {
		let previousCard = challengeDeck[index - 1];
		let currentCard = challengeDeck[index];
		let nextCard = challengeDeck[index + 1];

		if (currentCard.stage === stage && previousCard.stage !== stage) {
			minId = index;
		}

		if (currentCard.stage === stage && index + 1 === challengeDeck.length - 1) {
			maxId = index;

			break;
		}

		if (currentCard.stage === stage && nextCard.stage !== stage) {
			maxId = index;
		}
	}

	return {
		minId,
		maxId
	};
}

export {
	getDeck,
	getCard,
	dealDeck,
	removeCard,
	getBoundriesOfStageIds
};