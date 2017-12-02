'use strict';

import propertyTypes from '../constants/propertyTypes';

function validateName (name) {
	if (typeof name !== propertyTypes.name) {
		throw `Stage must be a ${propertyTypes.name}!`;
	}
}

function validateDescription (description) {
	if (typeof description !== propertyTypes.description) {
		throw `Stage must be a ${propertyTypes.description}!`;
	}
}

function validateImage (image) {
	if (typeof image !== propertyTypes.image) {
		throw `Stage must be a ${propertyTypes.image}!`;
	}
}

export {
	validateName,
	validateDescription,
	validateImage
};