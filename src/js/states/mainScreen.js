'use strict';

import characterSelection from '../selection/characterSelection';

let mainScreen = {
	create: (game) => {
    	characterSelection(game);
	},
	play: (game) => {
		game.state.start('play');
	}
};

export default mainScreen;