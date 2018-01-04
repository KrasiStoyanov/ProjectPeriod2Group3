'use strict';

import {suitablePlayersSuggestion } from '../player/helpers';

/**
 * @function
 * @name onActionCardClick
 * @param { object } player - The player.
 * @param { object } card - The card.
 * @description Place card on user interaction.
 */
function onActionCardClick (player, card) {
	player.placeCard(card);
	// suitablePlayersSuggestion(card);
	// player.giftCard(card, 2);
}

export {
	onActionCardClick
};