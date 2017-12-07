'use strict';

import { validatePlayerAmountOfCards } from '../validators/playerValidator';

let id = 0;
export default class Player {
	constructor(characterCard) {
		this._id = id++;
		this.characterCard = characterCard;
		this._name = characterCard.name;
		this._traits = characterCard.traits;
		this._cardsInHand = [];
	}

	get id() {
		return this._id;
	}

	get characterCard() {
		return this._characterCard;
	}

	set characterCard(value) {
		this._characterCard = value;
	}

	get name() {
		return this._name;
	}

	get traits() {
		return this._traits;
	}

	get cardsInHand() {
		return this._cardsInHand;
	}

	receiveCards(amount) {
		console.log(validatePlayerAmountOfCards(this.cardsInHand.length, amount));
	}
}