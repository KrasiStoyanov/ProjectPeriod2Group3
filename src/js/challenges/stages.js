'use strict';

import { dealDeck } from '../decks/challengeDeck';
import * as challengeCardConstants from '../constants/challengeCards';
import { isSuitableForChallenge } from '../validators/actionCardValidator';

let currentChallenge;
let currentStage = challengeCardConstants.stages.early;
let challengesList = [];
let placedActionCards = [];
let remainingPoints = 0;

/**
 * @function
 * @name placeActionCard
 * @param { object } actionCard - The action card.
 * @description Place action card on user interaction.
 */
function placeActionCard (actionCard) {
	console.log(actionCard)
	let hasAlreadyBeenPlaced = checkForDuplication(actionCard);
	if (hasAlreadyBeenPlaced) {
		return false;
	}

	let hasReturnedSuitableTrait = isSuitableForChallenge(actionCard, currentChallenge);
	if (hasReturnedSuitableTrait !== false) {
		placedActionCards.push(actionCard);
		calculatePoints(hasReturnedSuitableTrait);

		return true;
	} else {
		// Show the user that his card is not suitable for the challenge
		console.log('NOT');
		return false;
	}
}

/**
 * @function
 * @name calculatePoints
 * @param { object } trait - The trait of the action card.
 * @description Calculate the points when placing an action card.
 */
function calculatePoints (trait) {
	if (remainingPoints - trait.value <= 0) {
		currentChallenge.passed = true;
		challengesList.push(currentChallenge);

		changeStage();
		dealChallenge();
	} else {
		remainingPoints = remainingPoints - trait.value;
	}

	console.log(remainingPoints);
}

/**
 * @function
 * @name dealChallenge
 * @return { object } The random challenge card.
 * @description Deal a random challenge card.
 */
function dealChallenge () {
	let challenge = dealDeck(currentStage);

	currentChallenge = challenge;
	currentStage = challenge.stage;
	remainingPoints = challenge.traits[0].value;
	console.log(challenge);

	return challenge;
}

/**
 * @function
 * @name changeStage
 * @description Change the stage.
 */
function changeStage () {
	let counter = 0;
	for (let index = 0; index < challengesList.length; index += 1) {
		counter += 1;
	}

	switch (counter / challengeCardConstants.roundsPerStage) {
		case 0:
			currentStage = challengeCardConstants.stages.early;
			break;
		case 1:
			currentStage = challengeCardConstants.stages.mid;
			break;
		case 2:
			currentStage = challengeCardConstants.stages.late;
			break;
	}

	placedActionCards = [];
}

/**
 * @function
 * @name checkForDuplication
 * @param { object } actionCard - The action card.
 * @return { boolean } The result from the check.
 * @description Chec if the player has already placed this acction card.
 */
function checkForDuplication (actionCard) {
	for (let index = 0; index < placedActionCards.length; index += 1) {
		let currentCard = placedActionCards[index];
		if (currentCard.id === actionCard.id) {
			return true;
		}
	}

	return false;
}

export {
	placeActionCard,
	calculatePoints,
	dealChallenge,
	currentChallenge,
	currentStage
}