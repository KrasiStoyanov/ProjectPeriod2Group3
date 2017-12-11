'use strict';

import characterSelection from '../selection/characterSelection';

let mainScreen = {
	create: (game) => {
		// TODO: create main screen using the layot
	},
	win: (game) => {
		game.state.start('win');
	},
	lose: (game) => {
		game.state.start('lose');
	}
};

export default mainScreen;