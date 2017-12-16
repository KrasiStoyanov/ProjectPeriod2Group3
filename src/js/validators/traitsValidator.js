'use strict';

import * as traitConstants from '../constants/traitConstants';

/**
 * @function
 * @name validateTrait
 * @param { array } traits - The list of traits.
 * @description Check the types of the traits' properties and values and check if it is one of the constant ones.
 */
function validateTrait (traits) {
	for (let index = 0; index < traits.length; index += 1) {
		let currentTrait = traits[index];
		if (typeof currentTrait.name !== 'string') {
			throw `Type of traits must be a ${traitConstants.typeOfProps.type}`;
		}

		if (typeof currentTrait.value !== 'number') {
			throw `Type of traits must be a ${traitConstants.typeOfProps.value}`;
		}

		let traitTypesArr = [];
		for (let key in traitConstants.types) {
			traitTypesArr.push(traitConstants.types[key]);
		}

		if (traitTypesArr.indexOf(currentTrait.name) < 0) {
			throw `Trait type must be one of ${traitTypesArr}`;
		}
	}
}

export {
	validateTrait
};