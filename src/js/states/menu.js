'use strict';

let menuState = {
	/**
	 * @function
	 * @name create
	 * @param { object } game - The game object.
	 * @description This is the place where the main menu is displayed and manipulated.
	 */
	create: (game) => {
		// TODO: remove this line and create main menu
		game.state.start('playerSelection');
	},
	/**
	 * @function
	 * @name start
	 * @param { object } game - The game object.
	 * @description After the play button is clicked go to next state.
	 */
	start: (game) => {
		game.state.start('playerSelection');
	}
};

export default menuState;