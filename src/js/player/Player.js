'use strict';

import { validatePlayerAmountOfCards } from '../validators/playerValidator';
import * as actionDeck from '../decks/actionDeck';
import { placeActionCard } from '../challenges/stages';
import { giftActionCard } from './helpers';

let id = 0;

/** Class representing a player. */
export default class Player {
	/**
     * Create a player.
     * @param { object } characterCard - The character of the player..
     */
	constructor(characterCard) {
		this._id = id++;
		this.characterCard = characterCard;
		this._name = characterCard.name;
		this._traits = characterCard.traits;
		this._cardsInHand = [];
		this._isSelected = false;
		this._giftingCounter = 0;
	}

	/**
     * Get the id of the card.
     * @return { number } The id of the card.
     */
	get id() {
		return this._id;
	}

	/**
     * Get the character card.
     * @return { object } The character card.
     */
	get characterCard() {
		return this._characterCard;
	}

	/** Set the character card. */
	set characterCard(value) {
		this._characterCard = value;
	}

	/**
     * Get the name of the character.
     * @return { string } The name of the character.
     */
	get name() {
		return this._name;
	}

	/**
     * Get the traits of the character card.
     * @return { array } The traits of the character card.
     */
	get traits() {
		return this._traits;
	}

	/**
     * Get the cards in the player's hand.
     * @return { array } The cards in the player's hand.
     */
	get cardsInHand() {
		return this._cardsInHand;
	}

	/** Set the cards in the player's hand. */
	set cardsInHand(value) {
		this._cardsInHand = value;
	}

	/**
     * Say if a player is selected.
     * @return { boolean } If player is selected.
     */
	get isSelected() {
		return this._isSelected;
	}

	/** Set the state of the plpayer if he is selected. */
	set isSelected(value) {
		this._isSelected = value;
	}

	/**
     * Say if a player is selected.
     * @return { boolean } If player is selected.
     */
	get giftingCounter() {
		return this._giftingCounter;
	}

	/** Set the state of the plpayer if he is selected. */
	set giftingCounter(value) {
		this._giftingCounter = value;
	}

	/**
	 * @function
	 * @name receiveCards
	 * @param { number } amount - The amount of cards that need to be dealt.
	 * @description Deal the player the amount of cards he needs.
	 */
	receiveCards(amount) {
		let isAmountOfCardsInRange = validatePlayerAmountOfCards(this.cardsInHand.length, amount);
		if (isAmountOfCardsInRange === true) {
			let currentCard = actionDeck.dealDeck();
			currentCard.playerId = this.id;

			this.cardsInHand.push(currentCard);
		}
	}

	/**
	 * @function
	 * @name placeCard
	 * @param { object } card - The card that the player places.
	 * @description Place the action card that the player wants to use.
	 */
	placeCard(card) {
		let hasPlacedCard = placeActionCard(card);

		if (hasPlacedCard) {
			this.removeCard(card.id);

			return true;
		} else {
			return false;
		}
	}

	/**
	 * @function
	 * @name giftCard
	 * @param { object } card - The card that the player gifts.
	 * @description Gift the card to the chosen player.
	 */
	giftCard(card, playerId) {
		if (this.giftingCounter < 1) {
			let hasGiftedCard = giftActionCard(card, playerId);
			if (hasGiftedCard) {
				this.removeCard(card.id);
				this.giftingCounter = 1;

				return true;
			}
		}

		return false;
	}

	/**
	 * @function
	 * @name removeCard
	 * @param { number } id - The id of the card that needs to be removed.
	 * @description Remove a card from the player's hand.
	 */
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