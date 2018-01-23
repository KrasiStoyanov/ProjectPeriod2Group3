'use strict';

import { lightenBackgroundColor } from '../render/helpers';
import characterSelection from '../selection/characterSelection';
import * as playerSlots from '../render/playerSlots';

let playerSelectionState = {
	/**
	 * @function
	 * @name create
 	 * @param { Phaser.Game } gameObject - The game object.
	 * @description This is the place where the users select the number of players and choose their characters.
	 */
	create: (game) => {
		lightenBackgroundColor();
    	playerSlots.create(game);
    	characterSelection(game);
	}
};

export default playerSelectionState;