'use strict';

import * as traitsValidator from '../validators/traitsValidator';
import * as cardTypeValidator from '../validators/cardTypeValidator';

export default class Card {
	constructor(type, traits) {
		this.type = type;
		this.traits = traits;
	}

	get type() {
		return this._type;
	}

	set type(value) {
		cardTypeValidator.validateCardType(value);
		
		this._type = value;
	}

	get traits() {
		return this._traits;
	}

	set traits(value) {
		traitsValidator.validateTrait(value);

		this._traits = value;
	}
}