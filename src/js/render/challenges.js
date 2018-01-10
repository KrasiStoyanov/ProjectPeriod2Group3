'use strict';

import { currentChallenge } from '../challenges/stages';
import { onSurrenderClick } from '../selection/playerInteraction';

let fontProps = {
	font: '18px Karla',
	fill: '#fff',
	align: 'center',
	boundsAlignH: 'center',
	boundsAlignV: 'middle',
	wordWrap: true,
	wordWrapWidth: 400
};

let challenge;
let stage;
let trait;
let traitName;
let traitValue;
let surrenderButton;
let game;

let stageText;
let challengeText;
let traitText;
let remainingPointsText;

/**
 * @function
 * @name displayChallenge
 * @param { object } gameObject - The game object.
 * @description Display the current challenge.
 */
function displayChallenge (gameObject) {
	challenge = currentChallenge.challenge;
	stage = currentChallenge.stage;
	trait = currentChallenge.traits[0];
	traitName = trait.name;
	traitValue = trait.value;
	
	game = gameObject;

	challengeText = game.add.text(game.world.centerX, 100, challenge, fontProps);
	challengeText.anchor.x = 0.5;
	challengeText.anchor.y = 0;

	displayStage();
	displayTrait();
	displayPointsLeft();
	displaySurrenderButton();
}

/**
 * @function
 * @name displayStage
 * @description Display the current stage.
 */
function displayStage () {
	stageText = game.add.text(game.world.centerX, 50, `${stage} life`, fontProps);

	stageText.anchor.x = 0.5;
	stageText.anchor.y = 0;
}

/**
 * @function
 * @name displayTrait
 * @description Display the challenge's trait.
 */
function displayTrait () {
	traitText = game.add.text(game.world.centerX, 215, `${traitName}: ${traitValue}`, fontProps);

	traitText.anchor.x = 0.5;
	traitText.anchor.y = 0;
}

/**
 * @function
 * @name displayPointsLeft
 * @description Display the points left which are needed for passing the challenge.
 */
function displayPointsLeft () {
	remainingPointsText = game.add.text(game.world.centerX, game.world.centerY, `${traitValue}/${traitValue}`, fontProps);

	remainingPointsText.anchor.x = 0.5;
	remainingPointsText.anchor.y = 0;
}

/**
 * @function
 * @name displaySurrenderButton
 * @description Display the surrender option.
 */
function displaySurrenderButton () {
	surrenderButton = game.add.text(game.world.centerX, game.world.centerY - 50, 'Surrender', fontProps);

	surrenderButton.anchor.x = 0.5;
	surrenderButton.anchor.y = 0.5;

	surrenderButton.inputEnabled = true;
	surrenderButton.events.onInputDown.add(onSurrenderClick, this);
}

/**
 * @function
 * @name updatePointsLeft
 * @description Update the points left which are needed for passing the challenge.
 */
function updatePointsLeft (remainingPoints) {
	let initialPoints = traitValue;

	remainingPointsText.setText(`${remainingPoints}/${initialPoints}`);
}

/**
 * @function
 * @name updateChallenge
 * @description Update the current challenge.
 */
function updateChallenge () {
	challenge = currentChallenge.challenge;
	stage = currentChallenge.stage;
	trait = currentChallenge.traits[0];
	traitName = trait.name;
	traitValue = trait.value;

	challengeText.setText(challenge);
	stageText.setText(stage);
	traitText.setText(`${traitName}: ${traitValue}`);

	updatePointsLeft(traitValue);
}

/**
 * @function
 * @name endGame
 * @description Change screen after game is finished.
 */
function endGame () {
	game.state.start('win');
}

export {
	displayChallenge,
	updatePointsLeft,
	updateChallenge,
	endGame
}