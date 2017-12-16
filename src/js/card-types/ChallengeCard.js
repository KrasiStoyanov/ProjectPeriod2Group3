'use strict';

import Card from './Card';
import * as challengeCardValidator from '../validators/challengeCardValidator';

let id = 0;

/**
 * Class representing a challenge card.
 * @extends Card
 */
export default class ChallengeCard extends Card {
	/**
     * Create a challenge card.
     * @param { string } challenge - The challenge of the card.
     * @param { string } stage - The stage of the challenge.
     * @param { array } traits - The traits of the character.
     */
	constructor(challenge, stage, traits) {
		super('challenge', traits);
		this._id = id++;
		this.challenge = challenge;
		this.stage = stage;
		this.passed = false;
	}

	/**
     * Get the id of the card.
     * @return { number } The id of the card.
     */
	get id() {
		return this._id;
	}

	/**
     * Get the challenge of the card.
     * @return { string } The challenge of the card.
     */
	get challenge() {
		return this._challenge;
	}

	/** Set the challenge of the card. */
	set challenge(value) {
		challengeCardValidator.validateChallenge(value);

		this._challenge = value;
	}

	/**
     * Get the stage of the challenge.
     * @return { string } The stage of the challenge.
     */
	get stage() {
		return this._stage;
	}

	/** Set the stage of the challenge. */
	set stage(value) {
		challengeCardValidator.validateStage(value);

		this._stage = value;
	}

	/**
     * Get the passed state of the challenge.
     * @return { boolean } The passed state of the challenge.
     */
	get passed() {
		return this._passed;
	}

	/** Set the passed state of the challenge. */
	set passed(value) {
		this._passed = value;
	}
}