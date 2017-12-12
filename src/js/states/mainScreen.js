'use strict';

import characterSelection from '../selection/characterSelection';
import * as playerHelpers from '../player/helpers';

let mainScreen = {
	create: (game) => {
		// TODO: create main screen using the layot
		console.log(playerHelpers.getPlayers());
	},
	win: (game) => {
		game.state.start('win');
	},
	lose: (game) => {
		game.state.start('lose');
	}
};

export default mainScreen;