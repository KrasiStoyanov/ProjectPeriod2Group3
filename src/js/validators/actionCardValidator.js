'use strict';

import propertyTypes from '../constants/propertyTypes';

/**
 * @function
 * @name validateAction
 * @param { string } action - The action of the action card.
 * @description Check the type of the action.
 */
function validateAction (action) {
	if (typeof action !== propertyTypes.action) {
		throw `Stage must be a ${propertyTypes.action}!`;
	}
}

/**
 * @function
 * @name isSuitableForChallenge
 * @param { object } card - The action card.
 * @param { object } challenge - The challenge card.
 * @return { boolean } The result from the check.
 * @description Check if the card is suitable for the challegne.
 */
function isSuitableForChallenge (card, challenge) {
	let actionCardTraits = card.traits;
	let challengeTrait = challenge.traits[0];
	for (let index = 0; index < actionCardTraits.length; index += 1) {
		let currentTrait = actionCardTraits[index];
		if (currentTrait.name === challengeTrait.name) {
			return currentTrait;
		}
	}

	return false;
}

export {
	validateAction,
	isSuitableForChallenge
};