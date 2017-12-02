'use strict';

let mainState = {
	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
	},
	create: function () {
		game.stage.backgroundColor = '#71c5cf';
	},
	update: function () {

	}
};

let game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-wrapper');

game.state.add('main', mainState);

game.state.start('main');

export default game;