'use strict';

let id = 0;
export default class Player {
	constructor(name, characterCard) {
		this._id = id++;
		this.characterCard = characterCard;
		this.name = characterCard.name;
		this.traits = characterCard.traits;
		this.cardsInHand = [];
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
		return this.name;
	}

	get traits() {
		return this.traits;
	}

	get cardsInHand() {
		return this.cardsInHand;
	}
}