'use strict';

function onActionCardClick (player, card) {
	player.placeCard(card);

	console.log(player);
}

export {
	onActionCardClick
};