'use strict';

import propertyTypes from '../constants/propertyTypes';

function validateAction (action) {
	if (typeof action !== propertyTypes.action) {
		throw `Stage must be a ${propertyTypes.action}!`;
	}
}

export {
	validateAction
};