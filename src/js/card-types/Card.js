'use strict';

import * as traitsValidator from '../validators/traitsValidator';

export default class Card {
	constructor(type, traits) {
		this.type = type;
		this.traits = traits;
	}

	get type() {
		return this._type;
	}

	set type(value) {
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