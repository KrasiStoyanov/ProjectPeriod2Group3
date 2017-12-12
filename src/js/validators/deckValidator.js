'use strict';

import * as playerHelpers from '../player/helpers';

function hasDeckBeenDealt (deck) {
	if (deck.length === 0) {
		throw 'There are no cards left in the deck';
	}
}

export {
	hasDeckBeenDealt
};