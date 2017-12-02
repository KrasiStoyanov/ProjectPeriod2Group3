'use strict';

import * as cardTypes from '../constants/cardTypes';

function validateTrait (type) {
	if (cardTypes[type] === 'undefined') {
		let cardTypesArr = [];
		for (let key in traitConstants.types) {
			cardTypesArr.push(traitConstants.types[key]);
		}

		throw `Card type must be one of ${cardTypesArr}`;
	}
}

export {
	validateTrait
};