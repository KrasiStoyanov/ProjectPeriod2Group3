'use strict';

import * as traitConstants from '../constants/traitConstants';

function validateTrait (trait) {
	for (let index = 0; index < trait.length; index += 1) {
		let currentTrait = trait[index];
		if (typeof currentTrait.name !== 'string') {
			throw `Type of trait must be a ${traitConstants.typeOfProps.type}`;
		}

		if (typeof currentTrait.value !== 'number') {
			throw `Type of trait must be a ${traitConstants.typeOfProps.value}`;
		}

		if (traitConstants.types[currentTrait.name] === 'undefined') {
			let traitTypesArr = [];
			for (let key in traitConstants.types) {
				traitTypesArr.push(traitConstants.types[key]);
			}

			throw `Trait type must be one of ${traitTypesArr}`;
		}
	}
}

export {
	validateTrait
};