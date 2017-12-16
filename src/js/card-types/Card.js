'use strict';

import * as traitsValidator from '../validators/traitsValidator';
import * as cardTypeValidator from '../validators/cardTypeValidator';

/** Class representing a card. */
export default class Card {
	/**
     * Create a card.
     * @param { string } type - The type of the  card.
     * @param { array } traits - The traits of the card.
     */
	constructor(type, traits) {
		this.type = type;
		this.traits = traits;
	}

	/**
     * Get the type of the card.
     * @return { string } The type of the card.
     */
	get type() {
		return this._type;
	}

	/** Set the type of the card. */
	set type(value) {
		cardTypeValidator.validateCardType(value);
		
		this._type = value;
	}

	/**
     * Get the traits of the card.
     * @return { array } The traits of the card.
     */
	get traits() {
		return this._traits;
	}

	/** Set the traits of the card. */
	set traits(value) {
		traitsValidator.validateTrait(value);

		this._traits = value;
	}
}