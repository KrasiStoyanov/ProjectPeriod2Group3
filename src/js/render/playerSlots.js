'use strict';

import * as playerHelpers from '../player/helpers';
import { maxAmountOfPlayers } from '../constants/player';

let slotCoordinates = [];

function create (game) {
	let fontProps = {
        font: '24px Karla',
        fill: '#333',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    };

	for (let index = 0; index < maxAmountOfPlayers; index += 1) {
		// TODO: create constants for world dimensions and the elements in the game
		let playerSlot = game.add.group();
		let rectangle = new Phaser.Graphics(game, (198 * index) + (50 * (index + 1)), 700 - 288);
		let text = new Phaser.Text(game, (198 * index) + (50 * (index + 1)), 700 - 288, `Player slot ${index + 1}`, fontProps);

		rectangle.beginFill(0xf0f0f0);
		rectangle.drawRoundedRect(0, 0, 198, 288, 15);
		rectangle.endFill();

		text.setTextBounds(0, 0, 198, 288);
		playerSlot.add(text);
		playerSlot.add(rectangle);

		text.bringToTop();

		game.world.addChild(playerSlot);

		slotCoordinates.push({
			x: (198 * index) + (50 * (index + 1)),
			y: 700 - 288,
			isEmpty: true
		});
	}
}

export {
	create,
	slotCoordinates
};