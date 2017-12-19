'use strict';

import backgroundColors from '../constants/mainMenuBackgroundColors';

let mainMenuGroup;
let whiteTransparentLogo;
let pressToStartText;
let waves;
let game;

/**
 * @function
 * @name displayMainMenu
 * @param { object } game - The game object.
 * @description Display the main menu.
 */
function displayMainMenu (gameObject) {
	game = gameObject;

	randomBackgroundColor();

	whiteTransparentLogo = game.add.sprite(game.world.centerX, game.world.centerY, 'whiteTransparentLogo');
	whiteTransparentLogo.anchor.x = 0.5;
	whiteTransparentLogo.anchor.y = 0.5;
	whiteTransparentLogo.width = 300;
	whiteTransparentLogo.height = 300;

	game.add
		.tween(whiteTransparentLogo)
		.from({
			width: 280,
			height: 280
		})
		.to({
			width: 300,
			height: 300
		}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);

	pressToStartText = game.add.text(game.world.centerX, game.world.centerY + 200, 'Press to Start', {
		font: '24px Karla',
		fill: 'rgba(255, 255, 255, .9)',
		align: 'center'
	});

	pressToStartText.anchor.x = 0.5;

	mainMenuGroup = game.add.group();
	mainMenuGroup.add(whiteTransparentLogo);
	mainMenuGroup.add(pressToStartText);

	waves = game.add.sprite(game.world.centerX, game.world.height, 'waves');
	waves.anchor.x = 0.5;
	waves.anchor.y = 0;

	game.input.onTap.add(onScreenClick, this);
}

/**
 * @function
 * @name randomBackgroundColor
 * @description Generate and set a random background color.
 */
function randomBackgroundColor () {
	let keysOfBackgroundColors = Object.keys(backgroundColors);
	let randomIndex = Math.floor(Math.random() * (keysOfBackgroundColors.length - 0) + 0);
	let randomColorName = keysOfBackgroundColors[randomIndex];

	game.stage.backgroundColor = backgroundColors[randomColorName];
}

function onScreenClick (pointer) {
	game.world.bringToTop(mainMenuGroup);

	let wavesTween = game.add
		.tween(waves)
		.from({
			y: game.world.height
		})
		.to({
			y: -100
		}, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

	wavesTween.onComplete.add(onWavesComplete, this);
}

function onWavesComplete (sprite) {
	game.state.start('playerSelection');
}

export {
	displayMainMenu
}