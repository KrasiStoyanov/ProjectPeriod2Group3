'use strict';

import Card from './Card';
import * as actionCardValidator from '../validators/actionCardValidator';

let id = 0;
export default class ActionCard extends Card {
	constructor(action, traits) {
		super('action', traits);
		this._id = id++;
		this.action = action;
	}

	get id() {
		return this._id;
	}

	get action() {
		return this._action;
	}

	set action(value) {
		actionCardValidator.validateAction(value);

		this._action = value;
	}
}