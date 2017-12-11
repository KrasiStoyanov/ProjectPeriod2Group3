'use strict';

import characterSelection from '../selection/characterSelection';

let playerSelectionState = {
	create: (game) => {
    	// TODO: create the player selection screen
    	characterSelection(game);
	},
	play: (game) => {
		game.state.start('mainScreen');
	}
};

export default playerSelectionState;