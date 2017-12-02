'use strict';

import Card from './Card';
import * as challengeCardValidator from '../validators/challengeCardValidator';

let id = 0;
export default class ChallengeCard extends Card {
	constructor(challenge, stage, traits) {
		super('challenge', traits);
		this._id = id++;
		this.challenge = challenge;
		this.stage = stage;
	}

	get challenge() {
		return this._challenge;
	}

	set challenge(value) {
		challengeCardValidator.validateChallenge(value);

		this._challenge = value;
	}

	get stage() {
		return this._stage;
	}

	set stage(value) {
		challengeCardValidator.validateStage(value);

		this._stage = value;
	}

	get id() {
		return this._id;
	}
}