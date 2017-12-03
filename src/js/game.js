'use strict';

import * as characterDeck from './decks/characterDeck';
import Player from './player/Player';

let button,
	player,
	playerText;
let mainState = {
	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.load.spritesheet('button', './src/images/button.png');
	},
	create: function () {
		game.stage.backgroundColor = '#71c5cf';
    	button = game.add.button(game.world.centerX - 120, game.world.centerY - 120, 'button', this.actionOnClick, this);
	},
	update: function () {

	},
	actionOnClick: function () {
		let characterCard = characterDeck.getCard(0);

		player = new Player(characterCard);

		// TODO: Create constants for the font properties
		let fontProps = {
			font: '64px Karla'
		};

		playerText = game.add.text(200, 100, player.name, fontProps);
	}
};

let game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-wrapper');

game.state.add('main', mainState);

game.state.start('main');

export default game;