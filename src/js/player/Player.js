'use strict';

import { validatePlayerAmountOfCards } from '../validators/playerValidator';
import * as actionDeck from '../decks/actionDeck';
import { addToList } from '../challenges/stages';

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

	set cardsInHand(value) {
		this._cardsInHand = value;
	}

	receiveCards(amount, playerId) {
		let isAmountOfCardsInRange = validatePlayerAmountOfCards(this.cardsInHand.length, amount);
		if (isAmountOfCardsInRange === true) {
			for (let index = 0; index < amount; index += 1) {
				let currentCard = actionDeck.dealDeck();
				currentCard.playerId = playerId;

				actionDeck.removeCard(currentCard.id);
				this.cardsInHand.push(currentCard);
			}
		}
	}

	placeCard(card) {
		addToList(card);

		this.removeCard(card.id);
	}

	removeCard(id) {
		for (let index = 0; index < this.cardsInHand.length; index += 1) {
			let currentCard = this.cardsInHand[index];
			if (currentCard.id === id) {
				this.cardsInHand.splice(index, 1);

				return;
			}
		}
	}
}