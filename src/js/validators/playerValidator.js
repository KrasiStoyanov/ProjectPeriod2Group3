'use strict';

function validateDuplicatingPlayerInstances (players, player, characterCard) {
	let isDuplicating = players.filter(player => player.name === characterCard.name);
	if (isDuplicating.length) {
		throw 'A player with that Name has already been added';
	}
}

export {
	validateDuplicatingPlayerInstances
};