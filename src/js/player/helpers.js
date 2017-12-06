'use strict';

import Player from './Player';
import * as playerValidator from '../validators/playerValidator';

let players = [];
function addPlayer (characterCard) {
	let player = new Player(characterCard);
	playerValidator.validateDuplicatingPlayerInstances(players, player, characterCard);

	players.push(player);
}

function getPlayers () {
	let immutableList = Object.assign([], players);

	return immutableList;
}

export {
	addPlayer,
	getPlayers
}