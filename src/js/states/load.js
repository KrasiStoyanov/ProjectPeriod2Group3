'use strict';

let loadState = {
	preload: (game) => {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.load.spritesheet('button', './src/images/button.png');
		game.load.spritesheet('characterButton1', './src/images/character-1.png');
		game.load.spritesheet('characterButton2', './src/images/character-2.png');
		game.load.spritesheet('characterButton3', './src/images/character-3.png');
		game.load.spritesheet('characterButton4', './src/images/character-4.png');
		game.load.spritesheet('characterButton5', './src/images/character-5.png');
		game.load.spritesheet('characterButton6', './src/images/character-6.png');
		game.load.spritesheet('characterButton7', './src/images/character-7.png');
		game.load.spritesheet('characterButton8', './src/images/character-8.png');
	},
	create: (game) => {
		game.stage.backgroundColor = '#71c5cf';

		game.state.start('menu');
	}
};

export default loadState;