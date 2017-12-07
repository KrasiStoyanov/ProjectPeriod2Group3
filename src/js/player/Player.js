'use strict';

import { validatePlayerAmountOfCards } from '../validators/playerValidator';
import * as actionDeck from '../decks/actionDeck';

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
		let isAmountOfCardsInRange = validatePlayerAmountOfCards(this.cardsInHand.length, amount);
		if (isAmountOfCardsInRange === true) {
			for (let index = 0; index < amount; index += 1) {
				let currentCard = actionDeck.getTopCard();

				actionDeck.removeTopCard();
				this.cardsInHand.push(currentCard);
			}
		}
	}
}