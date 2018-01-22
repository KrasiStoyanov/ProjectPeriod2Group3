'use strict';

import * as mainMenuConstants from '../constants/mainMenu';
import * as traitConstants from '../constants/traitConstants';

let game;
let backgroundColor;
let backgroundColorName;

/**
 * @function
 * @name generateRandomBackgroundColor
 * @description Generate and set a random background color.
 */
function generateRandomBackgroundColor (gameObject) {
	game = gameObject ? gameObject : game;

	let backgroundColors = mainMenuConstants.backgroundColors;
	let solidBackgroundColors = backgroundColors.solid;
	let keysOfSolidBackgroundColors = Object.keys(solidBackgroundColors);
	let randomIndex = Math.floor(Math.random() * (keysOfSolidBackgroundColors.length - 0) + 0);
	let randomColorName = keysOfSolidBackgroundColors[randomIndex];

	backgroundColor = solidBackgroundColors[randomColorName];
	backgroundColorName = randomColorName;
	game.stage.backgroundColor = solidBackgroundColors[randomColorName];
}

/**
 * @function
 * @name getBackgroundColor
 * @return { string } The background color.
 * @description Get the background color.
 */
function getBackgroundColor () {
	return backgroundColor;
}

/**
 * @function
 * @name lightenBackgroundColor
 * @param { number } By how much should the background be lightened.
 * @description Lighten the background color.
 */
function lightenBackgroundColor () {
	let backgroundColors = mainMenuConstants.backgroundColors;
	let lightBackgroundColors = backgroundColors.light;

	game.stage.backgroundColor = lightBackgroundColors[backgroundColorName];
}

function getIdOfTraitIcon (trait) {
	let index = 0;
	for (let key in traitConstants.types) {
		let currentTrait = traitConstants.types[key];
		if (currentTrait === trait) {
			return index;
		}

		index += 1;
	}
}

export {
	generateRandomBackgroundColor,
	getBackgroundColor,
	lightenBackgroundColor,
	getIdOfTraitIcon
}