'use strict';

import Player from './player/Player';
import characterSelection from './selection/characterSelection';

let button,
	player,
	playerText,
	characterDeck;
let mainState = {
	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.load.spritesheet('button', './src/images/button.png');
	},
	create: function () {
		game.stage.backgroundColor = '#71c5cf';
    	// button = game.add.button(game.world.centerX - 120, game.world.centerY - 120, 'button', this.actionOnClick, this);
    	characterSelection(game);
	},
	update: function () {

	},
	onCharacterSelect: function () {

	},
	actionOnClick: function () {
		// let characterCard = characterDeck.getCard(0);

		// player = new Player(characterCard);

		// TODO: Create constants for the font properties
		// let fontProps = {
		// 	font: '64px Karla'
		// };

		// playerText = game.add.text(200, 100, player.name, fontProps);
		// playerText = game.add.text(200, 164, player.traits, fontProps);
	}
};

let game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-wrapper');

game.state.add('main', mainState);

game.state.start('main');

export default game;