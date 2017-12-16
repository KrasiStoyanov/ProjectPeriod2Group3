'use strict';

import characterSelection from '../selection/characterSelection';

let playerSelectionState = {
	/**
	 * @function
	 * @name create
	 * @param { object } game - The game object.
	 * @description This is the place where the users select the number of players and choose their characters.
	 */
	create: (game) => {
    	// TODO: create the player selection screen
    	characterSelection(game);
	},
	/**
	 * @function
	 * @name win
	 * @param { object } game - The game object.
	 * @description After finishing the player selection go to next state.
	 */
	play: (game) => {
		game.state.start('mainScreen');
	}
};

export default playerSelectionState;