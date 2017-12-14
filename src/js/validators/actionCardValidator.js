'use strict';

import propertyTypes from '../constants/propertyTypes';

function validateAction (action) {
	if (typeof action !== propertyTypes.action) {
		throw `Stage must be a ${propertyTypes.action}!`;
	}
}

function isSuitableForChallenge (card, challenge) {
	let actionCardTraits = card.traits;
	let challengeTrait = challenge.traits[0];
	for (let index = 0; index < actionCardTraits.length; index += 1) {
		let currentTrait = actionCardTraits[index];
		if (currentTrait.name === challengeTrait.name) {
			return true;
		}
	}

	return false;
}

export {
	validateAction,
	isSuitableForChallenge
};