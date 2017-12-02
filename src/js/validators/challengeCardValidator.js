'use strict';

import propertyTypes from '../constants/propertyTypes';
import * as challengeCards from '../constants/challengeCards';

function validateStage (stage) {
	if (typeof stage !== propertyTypes.stage) {
		throw `Stage must be a ${propertyTypes.stage}!`;
	}

	let stages = [];
	for (let key in challengeCards.stages) {
		stages.push(challengeCards.stages[key]);
	}

	if (stages.indexOf(stage) < 0) {
		throw `Card stage must be one of ${stages}`;
	}
}

function validateChallenge (challenge) {
	if (typeof challenge !== propertyTypes.challenge) {
		throw `Stage must be a ${propertyTypes.challenge}!`;
	}
}

export {
	validateStage,
	validateChallenge
};