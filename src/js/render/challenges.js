'use strict';

import { currentChallenge } from '../challenges/stages';
import { onSurrenderClick } from '../selection/playerInteraction';
import { getIdOfTraitIcon } from './helpers';

let fontProps = {
	font: '20px Karla',
	fill: '#000000',
	align: 'center',
	boundsAlignH: 'center',
	boundsAlignV: 'middle',
	wordWrap: true,
	wordWrapWidth: 250
};
let stageFontProp ={
	font: '26px Karla',
	fill: '#000000',
	align: 'center',
	boundsAlignH: 'center',
	boundsAlignV: 'middle',
	wordWrap: true,
	wordWrapWidth: 250
}
let traitValueFontProps ={
	font: '20px Karla',
	fill: '#ffffff',
	align: 'center',
	boundsAlignH: 'center',
	boundsAlignV: 'middle',
	wordWrap: true,
	wordWrapWidth: 250
}

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
let traitIcon;
let traitIconIndex;
let challengeBackground;

/**
 * @function
 * @name displayChallenge
 * @param { object } gameObject - The game object.
 * @description Display the current challenge.
 */
function displayChallenge (gameObject) {
	game = gameObject ? gameObject : game;
	challengeBackground= game.add.sprite(game.world.centerX, game.world.centerY-100, 'challengeCard');
	challengeBackground.anchor.x= 0.5;
	challengeBackground.anchor.y= 0.5;
	challengeBackground.bringToBack;
	
	challenge = currentChallenge.challenge;
	stage = currentChallenge.stage;
	trait = currentChallenge.traits[0];
	traitName = trait.name;
	traitValue = trait.value;
	
	challengeText = game.add.text(game.world.centerX, 200, challenge, fontProps);
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
	stageText = game.add.text(game.world.centerX, 125, `${stage} life`, stageFontProp);

	stageText.anchor.x = 0.5;
	stageText.anchor.y = 0;
	
	
}

/**
 * @function
 * @name displayTrait
 * @description Display the challenge's trait.
 */
function displayTrait () {
	
	let traitValueY=challengeBackground.bottom;
	traitIconIndex=getIdOfTraitIcon(traitName);
	traitValue = trait.value;

	traitIcon = game.add.sprite(game.world.centerX,traitValueY-60, 'whiteTraits', traitIconIndex)
	traitIcon.anchor.x=0.5;
		
	let traitIconY=traitIcon.top;
	
	
	traitText = game.add.text(game.world.centerX, traitIconY, traitValue, traitValueFontProps);
	traitText.anchor.x = 0.5;
	traitText.anchor.y = 1;
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
	surrenderButton = game.add.sprite(game.world.centerX,  challengeBackground.top-40, 'surrenderButton');

	surrenderButton.scale.setTo(0.8,0.8)
	surrenderButton.anchor.x = 0.5;
	surrenderButton.anchor.y = 0;

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
	traitIcon.destroy();
	traitText.destroy();
	
	challenge = currentChallenge.challenge;
	stage = currentChallenge.stage;
	trait = currentChallenge.traits[0];
	
	displayTrait();
	challengeText.setText(challenge);
	stageText.setText(`${stage} life`);
	
	
	

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