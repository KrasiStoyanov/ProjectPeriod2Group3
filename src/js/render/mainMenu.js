'use strict';

import * as mainMenuConstants from '../constants/mainMenu';

let mainMenuGroup;
let wavesGroup;
let whiteTransparentLogo;
let pressToStartText;
let waves;
let game;
let positionOnWhichToUpdateTween;
let wavesTweenWavy;

/**
 * @function
 * @name displayMainMenu
 * @param { object } gameObject - The game object.
 * @description Display the main menu.
 */
function displayMainMenu (gameObject) {
	game = gameObject;

	randomBackgroundColor();

	whiteTransparentLogo = game.add.button(game.world.centerX, game.world.centerY, 'whiteTransparentLogo', onScreenClick, this);
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
		font: '20px Karla',
		fill: 'rgba(255, 255, 255, .9)',
		align: 'center'
	});

	pressToStartText.anchor.x = 0.5;

	mainMenuGroup = game.add.group();
	mainMenuGroup.add(whiteTransparentLogo);
	mainMenuGroup.add(pressToStartText);

	waves = game.add.sprite(0, game.world.height, 'waves');
	waves.anchor.x = 0;
	waves.anchor.y = 0;

	wavesGroup = game.add.group();
	wavesGroup.add(waves);

	positionOnWhichToUpdateTween = -waves.width;

	game.world.bringToTop(mainMenuGroup);
	game.input.onTap.add(onScreenClick, this);
}

/**
 * @function
 * @name randomBackgroundColor
 * @description Generate and set a random background color.
 */
function randomBackgroundColor () {
	let backgroundColors = mainMenuConstants.backgroundColors;
	let keysOfBackgroundColors = Object.keys(backgroundColors);
	let randomIndex = Math.floor(Math.random() * (keysOfBackgroundColors.length - 0) + 0);
	let randomColorName = keysOfBackgroundColors[randomIndex];

	game.stage.backgroundColor = backgroundColors[randomColorName];
}

/**
 * @function
 * @name onScreenClick
 * @description Start waves animation on screen click.
 */
function onScreenClick () {
	game.input.onTap.removeAll();
	whiteTransparentLogo.inputEnabled = false;

	let wavesTweenRise = game.add
		.tween(waves)
		.from({
			y: game.world.height
		})
		.to({
			y: -100
		}, mainMenuConstants.tweenDurations.rising, Phaser.Easing.Linear.none, true, 0, 0, false);

	wavesTweenRise.onComplete.add(onWavesRiseComplete, this);

	wavesTweenWavy = game.add
		.tween(waves)
		.from({
			x: 0
		})
		.to({
			x: positionOnWhichToUpdateTween
		}, mainMenuConstants.tweenDurations.wavy, Phaser.Easing.Linear.none, true, 0, 0, false);
}

/**
 * @function
 * @name onWavesComplete
 * @description Change screen after waves animation is complete.
 */
function onWavesRiseComplete () {
	game.state.start('playerSelection');
}

export {
	displayMainMenu
}