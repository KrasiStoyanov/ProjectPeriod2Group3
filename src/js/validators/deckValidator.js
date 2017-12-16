'use strict';

import * as playerHelpers from '../player/helpers';

/**
 * @function
 * @name hasDeckBeenDealt
 * @param { object } deck - The deck.
 * @description Check if the deck has any cards left.
 */
function hasDeckBeenDealt (deck) {
	if (deck.length === 0) {
		throw 'There are no cards left in the deck';
	}
}

export {
	hasDeckBeenDealt
};