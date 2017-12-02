'use strict';

import cardTypes from '../constants/cardTypes';

function validateCardType (type) {
	let cardTypesArr = [];
	for (let key in cardTypes) {
		cardTypesArr.push(cardTypes[key]);
	}

	if (cardTypesArr.indexOf(type) < 0) {
		throw `Card type must be one of ${cardTypesArr}`;
	}
}

export {
	validateCardType
};