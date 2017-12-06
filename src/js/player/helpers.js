'use strict';

import Player from './Player';

let players = [];
function addPlayer (characterCard) {
	let player = new Player(characterCard);
	for (let index = 0; index < players.length; index += 1) {
		let currentPlayer = players[index];
		if (player.name === currentPlayer.name) {
			throw 'A player with that Name has already been added';
		}
	}

	players.push(player);
}

function getPlayers () {
	return players;
}

export {
	addPlayer,
	getPlayers
}