'use strict';

import * as traitConstants from '../constants/traitConstants';

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