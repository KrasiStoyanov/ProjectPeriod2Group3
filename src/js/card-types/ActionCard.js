'use strict';

import Card from './Card';
import * as actionCardValidator from '../validators/actionCardValidator';

let id = 0;
export default class ActionCard extends Card {
	constructor(action, traits) {
		super('action', traits);
		this._id = id++;
		this.action = action;
		this.playerId;
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


	get playerId() {
		return this._playerId;
	}

	set playerId(value) {
		this._playerId = value;
	}
}