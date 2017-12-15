'use strict';

import { dealDeck } from '../decks/challengeDeck';
import { stages } from '../constants/challengeCards';
import { isSuitableForChallenge } from '../validators/actionCardValidator';

let currentChallenge;
let currentStage = stages.early;
let challengesList = [];
let placedActionCards = [];

function placeActionCard (actionCard) {
	let isSuitable = isSuitableForChallenge(actionCard, currentChallenge);
	if (isSuitable) {
		placedActionCards.push(actionCard);

		return true;
	} else {
		// Show the user that his card is not suitable for the challenge
		console.log('NOT');
		return false;
	}
}

function calculatePoints () {

}

function dealChallenge () {
	let challenge = dealDeck(currentStage);

	currentChallenge = challenge;
	currentStage = challenge.stage;

	return challenge;
}

export {
	placeActionCard,
	calculatePoints,
	dealChallenge
}