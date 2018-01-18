'use strict';

import { updateSelectedPlayerCards } from '../render/players';
import { surrender } from '../challenges/stages';

/**
 * @function
 * @name onActionCardClick
 * @param { object } player - The player.
 * @param { object } card - The card.
 * @description Place card on user interaction.
 */
function placeActionCard (player, card) {
	let hasPlacedCard = player.placeCard(card);
	if (hasPlacedCard) {
		updateSelectedPlayerCards();
	}
}

/**
 * @function
 * @name onSurrenderClick
 * @description Call the back end functionality for surrender and update render.
 */
function onSurrenderClick () {
	surrender();
	updateSelectedPlayerCards();
}

export {
	placeActionCard,
	onSurrenderClick
};