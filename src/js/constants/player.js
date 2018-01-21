'use strict';

/** The min and max amount of cards that the players should have initially */
const minAmountOfCardsInitial = 5;
const maxAmountOfCardsInitial = 6;

/** The min and max amount of cards that the players should have */
const minAmountOfCards = 0;
const maxAmountOfCards = 12;

/** The min and max amount of players who can participate in the game */
const minAmountOfPlayers = 3;
const maxAmountOfPlayers = 5;

/** The id of the player that would be initially selected when the game starts */
const firstPlayerToStartId = 0;

const selectedPlayerImage = {
	width: 170,
	height: 250,
	margin: {
		left: 75
	}
};

const sidePlayerImageSize = {
	width: 90,
	height: 100
};

const sidePlayerRectangle = {
	width: 125,
	height: 125,
	gutter: 6,
	margin: {
		left: 40
	}
};

const name = {
	margin: {
		right: 10
	}
};

export {
	minAmountOfCardsInitial,
	maxAmountOfCardsInitial,
	minAmountOfCards,
	maxAmountOfCards,
	minAmountOfPlayers,
	maxAmountOfPlayers,
	firstPlayerToStartId,
	selectedPlayerImage,
	sidePlayerImageSize,
	sidePlayerRectangle,
	name
};