'use strict';

import propertyTypes from '../constants/propertyTypes';

function validateStage (stage) {
	if (typeof stage !== propertyTypes.stage) {
		throw `Stage must be a ${propertyTypes.stage}!`;
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