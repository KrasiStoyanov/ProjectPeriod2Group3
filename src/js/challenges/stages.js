'use strict';

import { dealDeck } from '../decks/challengeDeck';
import { stages } from '../constants/challengeCards';

let currentChallenge;
let currentStage = stages.early;
let challengesList = [];
let placedActionCards = [];

function placeActionCard (actionCard) {
	placedActionCards.push(actionCard);
}

function calculatePoints () {

}

function dealChallenge () {
	let challenge = dealDeck(currentStage);

	return challenge;
}

export {
	placeActionCard,
	calculatePoints,
	dealChallenge
}