'use strict';

import { displayEnding } from '../render/endings';

let winState = {
	/**
	 * @function
	 * @name create
	 * @param { object } game - The game object.
	 * @description This is the place where the ending is displayed.
	 */
	create: (game) => {
		displayEnding(game);
	}
};

export default winState;