'use strict';

let menuState = {
	create: (game) => {
		// TODO: remove this line and create main menu
		game.state.start('playerSelection');
	},
	start: (game) => {
		game.state.start('playerSelection');
	}
};

export default menuState;