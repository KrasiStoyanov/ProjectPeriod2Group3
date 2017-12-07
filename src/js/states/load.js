'use strict';

let loadState = {
	preload: (game) => {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.load.spritesheet('button', './src/images/button.png');
	},
	create: (game) => {
		game.stage.backgroundColor = '#71c5cf';

		game.state.start('menu');
	}
};

export default loadState;