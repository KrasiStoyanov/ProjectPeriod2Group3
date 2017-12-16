'use strict';

import propertyTypes from '../constants/propertyTypes';
import * as challengeCards from '../constants/challengeCards';

/**
 * @function
 * @name validateStage
 * @param { string } stage - The stage of the challenge.
 * @description Check the type of the stage and if it matches one of the constants.
 */
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

/**
 * @function
 * @name validateChallenge
 * @param { string } challenge - The challenge.
 * @description Check the type of the challenge.
 */
function validateChallenge (challenge) {
	if (typeof challenge !== propertyTypes.challenge) {
		throw `Stage must be a ${propertyTypes.challenge}!`;
	}
}

export {
	validateStage,
	validateChallenge
};