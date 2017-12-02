'use strict';

import Card from './Card';
import * as actionCardValidator from '../validators/actionCardValidator';

export default class ActionCard extends Card {
	constructor(action, traits) {
		super('action', traits);
		this.action = action;
	}

	get action() {
		return this._action;
	}

	set action(value) {
		actionCardValidator.validateAction(value);

		this._action = value;
	}
}