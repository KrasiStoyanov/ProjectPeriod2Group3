'use strict';

let loadState = {
	/**
	 * @function
	 * @name preload
	 * @param { object } game - The game object.
	 * @description Load all assets for the game.
	 */
	preload: (game) => {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.load.image('button', './src/images/button.png');
		game.load.image('characterCard1', './src/images/character-1.png');
		game.load.image('characterCard2', './src/images/character-2.png');
		game.load.image('characterCard3', './src/images/character-3.png');
		game.load.image('characterCard4', './src/images/character-4.png');
		game.load.image('characterCard5', './src/images/character-5.png');
		game.load.image('characterCard6', './src/images/character-6.png');
		game.load.image('characterCard7', './src/images/character-7.png');
		game.load.image('characterCard8', './src/images/character-8.png');
	},
	/**
	 * @function
	 * @name create
	 * @param { object } game - The game object.
	 * @description When done with the preload function, go to next state.
	 */
	create: (game) => {
		game.stage.backgroundColor = '#71c5cf';

		game.state.start('menu');
	}
};

export default loadState;