'use strict';

import propertyTypes from '../constants/propertyTypes';

/**
 * @function
 * @name validateName
 * @param { string } name - The name.
 * @description Check the type of the name.
 */
function validateName (name) {
	if (typeof name !== propertyTypes.name) {
		throw `Stage must be a ${propertyTypes.name}!`;
	}
}

/**
 * @function
 * @name validateDescription
 * @param { string } description - The description.
 * @description Check the type of the description.
 */
function validateDescription (description) {
	if (typeof description !== propertyTypes.description) {
		throw `Stage must be a ${propertyTypes.description}!`;
	}
}

/**
 * @function
 * @name validateImage
 * @param { string } image - The image path.
 * @description Check the type of the image path.
 */
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