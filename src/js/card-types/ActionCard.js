'use strict';

import Card from './Card';
import * as actionCardValidator from '../validators/actionCardValidator';

let id = 0;

/**
 * Class representing an action card.
 * @extends Card
 */
export default class ActionCard extends Card {
	/**
     * Create an action card.
     * @param { string } action - The action of the card.
     * @param { array } traits - The traits of the card.
     */
	constructor(action, traits) {
		super('action', traits);
		this._id = id++;
		this.action = action;
		this.playerId;
	}

	/**
     * Get the id of the card.
     * @return { number } The id of the card.
     */
	get id() {
		return this._id;
	}

	/**
     * Get the action of the card.
     * @return { string } The action of the card.
     */
	get action() {
		return this._action;
	}

	/** Set the action of the card. */
	set action(value) {
		actionCardValidator.validateAction(value);

		this._action = value;
	}

	/**
     * Get the id of the player who is holding this card in his hand.
     * @return { number } The id of the player who is holding this card in his hand.
     */
	get playerId() {
		return this._playerId;
	}

	/** Set the id of the player who is holding this card in his hand. */
	set playerId(value) {
		this._playerId = value;
	}
}