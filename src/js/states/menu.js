'use strict';

import characterSelection from '../selection/characterSelection';

let menuState = {
	create: (game) => {
    	characterSelection(game);
	},
	start: (game) => {
		game.state.start('mainScreen');
	}
};

export default menuState;