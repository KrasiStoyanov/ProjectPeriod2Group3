'use strict';

import { progressBar, barWidth } from './progressBar';

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

/** Styles for the selected player image */
const selectedPlayerImage = {
	width: 170,
	height: 250,
	margin: {
		left: 75
	}
};

const selectedPlayerTraits = {
	icon: {
		size: 35
	},
	margin: {
		top: 10,
		bottom: 10
	}
};

/** Styles for the side player images */
const sidePlayerImageSize = {
	width: 90,
	height: 100
};

/** Styles for the side player rectangles */
const sidePlayerRectangle = {
	width: 125,
	height: 125,
	gutter: 6,
	margin: {
		left: 6
	}
};

/** Side players position */
const sidePlayers = {
	margin: {
		left: progressBar.margin.left + barWidth + progressBar.margin.right
	}
};

/** Styles for the selected player name */
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
	selectedPlayerTraits,
	sidePlayerImageSize,
	sidePlayerRectangle,
	sidePlayers,
	name
};