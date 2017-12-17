'use strict';

/**
 * @function
 * @name onActionCardClick
 * @param { object } player - The player.
 * @param { object } card - The card.
 * @description Place card on user interaction.
 */
function onActionCardClick (player, card) {
	player.placeCard(card);
}

export {
	onActionCardClick
};