'use strict';

import cardTypes from '../constants/cardTypes';

/**
 * @function
 * @name validateCardType
 * @param { string } type - The type of the card.
 * @description Check the type of the card types.
 */
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