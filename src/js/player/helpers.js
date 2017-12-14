'use strict';

import Player from './Player';
import * as playerValidator from '../validators/playerValidator';
import * as playerConstants from '../constants/player';

let players = [];
function addPlayer (characterCard) {
	let player = new Player(characterCard);
	playerValidator.validateDuplicatingPlayerInstances(players, player, characterCard);

	players.push(player);

	return player;
}

function getPlayers () {
	let immutableList = Object.assign([], players);

	return immutableList;
}

function getPlayer (id) {
	let player = players.filter(p => p.id === id)[0];

	return player;
}

function amountOfCardsToBeInitiallyDealt () {
	if (players.length === 3) {
		return playerConstants.maxAmountOfCards;
	} else if (players.length > 3) {
		return playerConstants.minAmountOfCards;
	}
}

export {
	addPlayer,
	getPlayers,
	getPlayer,
	amountOfCardsToBeInitiallyDealt
}