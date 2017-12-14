'use strict';

import * as deckValidator from '../validators/deckValidator';
import * as challengeCardConstants from '../constants/challengeCards';
import * as actionCardConstants from '../constants/actionCards';

let randomId;
function getCard (deck, id) {
	for (let index = 0; index < deck.length; index += 1) {
		let currentCard = deck[index];
		if (currentCard.id === id) {
			return currentCard;
		}
	}
}

function dealDeck (deck, ...args) {
	if (args.length === 0) {
		deckValidator.hasDeckBeenDealt(deck);
		randomIdGenerator(deck, actionCardConstants.limits.minChallengeId, actionCardConstants.limits.maxChallengeId);
	} else {
		let currentStage = args[0].stage;
		switch (currentStage) {
			case challengeCardConstants.stages.early:
				randomIdGenerator(deck, challengeCardConstants.stageLimits.early.minChallengeId, challengeCardConstants.stageLimits.early.maxChallengeId);

				break;
			case challengeCardConstants.stages.mid:
				randomIdGenerator(deck, challengeCardConstants.stageLimits.mid.minChallengeId, challengeCardConstants.stageLimits.mid.maxChallengeId);
				
				break;
			case challengeCardConstants.stages.late:
				randomIdGenerator(deck, challengeCardConstants.stageLimits.late.minChallengeId, challengeCardConstants.stageLimits.late.maxChallengeId);
				
				break;
		}
	}

	let randomCard = getCard(deck, randomId);
	removeCard(deck, randomId);

	return randomCard;
}

function randomIdGenerator (deck, min, max) {
	let isDone = false;
	while (!isDone) {
		randomId = Math.floor(Math.random() * (max - min) + min);
		let hasFoundCard = deck.filter(card => card.id === randomId);
		if (hasFoundCard.length > 0) {
			isDone = true;
		}
	}
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