'use strict';

let menuState = {
	create: (game) => {
		// TODO: remove this line and create main menu
		game.state.start('mainScreen');
	},
	start: (game) => {
		game.state.start('mainScreen');
	}
};

export default menuState;