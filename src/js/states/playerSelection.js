'use strict';

import { lightenBackgroundColor } from '../render/helpers';
import characterSelection from '../selection/characterSelection';
import * as playerSlots from '../render/playerSlots';

let playerSelectionState = {
	/**
	 * @function
	 * @name create
	 * @param { object } game - The game object.
	 * @description This is the place where the users select the number of players and choose their characters.
	 */
	create: (game) => {
		lightenBackgroundColor();
    	playerSlots.create(game);
    	characterSelection(game);
	},
	/**
	 * @function
	 * @name update
	 * @param { object } game
	 * @description This is where the animations are called, and sprites are manipulated 
	 */
	update: (game) =>{

	}
};

export default playerSelectionState;