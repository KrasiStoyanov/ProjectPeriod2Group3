'use strict';

import { currentChallenge } from '../challenges/stages';
import { onSurrenderClick } from '../selection/playerInteraction';
import { getIdOfTraitIcon } from './helpers';
import * as challengeCardConstants from '../constants/challengeCards';

let fontProps = {
	font: '18px Karla',
	fill: '#000',
	align: 'center',
	boundsAlignH: 'center',
	boundsAlignV: 'middle',
	wordWrap: true,
	wordWrapWidth: 250
};

let stageFontProp = {
	font: '26px Karla',
	fill: '#000',
	align: 'center'
};

let traitValueFontProps = {
	font: '20px Karla',
	fill: '#fff',
	align: 'center'
};

let counterFontProps = {
	font: 	'100px Karla',
	fill: 	'#7f767f'
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
let challengeCardGroup;
let counterIcon;

/**
 * @function
 * @name displayChallenge
 * @param { object } gameObject - The game object.
 * @description Display the current challenge.
 */
function displayChallenge (gameObject) {
	game = gameObject ? gameObject : game;

	challengeCardGroup = game.add.group();

	challengeBackground = game.add.sprite(0, 0, 'challengeCardBack');
	challengeBackground.scale.set(challengeCardConstants.size.height / challengeBackground.height);
	challengeBackground.bringToBack;

	challengeCardGroup.add(challengeBackground);

	challengeCardGroup.x = game.world.centerX - (challengeBackground.width / 2);
	challengeCardGroup.y = 60;
	
	challenge = currentChallenge.challenge;
	stage = currentChallenge.stage;
	trait = currentChallenge.traits[0];
	traitName = trait.name;
	traitValue = trait.value;
	
	displayStage();
	displayChallengeText();
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
	let textX = challengeBackground.centerX;
	stageText = game.add.text(textX, challengeCardConstants.stageMargin.top, `${stage} Life`, stageFontProp);
	stageText.anchor.set(0.5, 0);

	challengeCardGroup.add(stageText);
}

/**
 * @function
 * @name displayChallengeText
 * @description Display the challenge text.
 */
function displayChallengeText () {
	let textX = challengeBackground.centerX;
	let textY = challengeCardConstants.challengeTextMargin.top + challengeCardConstants.challengeTextMargin.bottom + stageText.height;
	
	fontProps.wordWrapWidth = challengeBackground.width - (challengeCardConstants.challengeTextMargin.right + challengeCardConstants.challengeTextMargin.left);
	challengeText = game.add.text(textX, textY, challenge, fontProps);
	challengeText.anchor.set(0.5, 0);

	challengeCardGroup.add(challengeText);
}

/**
 * @function
 * @name displayTrait
 * @description Display the challenge's trait.
 */
function displayTrait () {
	let traitValueY = challengeBackground.bottom - (challengeCardConstants.traitIcon.height + challengeCardConstants.traitIcon.margin.bottom);
	traitIconIndex = getIdOfTraitIcon(traitName);

	traitIcon = game.add.sprite(challengeBackground.centerX, traitValueY, 'whiteTraits');
	traitIcon.frame = traitIconIndex;
	traitIcon.anchor.set(0.5, 0);
		
	let traitIconY = traitIcon.top;

	traitText = game.add.text(challengeBackground.centerX, traitIconY, traitValue, traitValueFontProps);
	traitText.anchor.x = 0.5;
	traitText.anchor.y = 1;

	challengeCardGroup.add(traitIcon);
	challengeCardGroup.add(traitText);
}

/**
 * @function
 * @name displayPointsLeft
 * @description Display the points left which are needed for passing the challenge.
 */
function displayPointsLeft () {
	traitIconIndex = getIdOfTraitIcon(traitName);
	counterIcon = game.add.sprite((1.7 * game.world.centerX), (0.267 * game.world.centerY), 'whiteTraits');
	counterIcon.frame = traitIconIndex;
	counterIcon.scale.setTo(2, 2);
	counterIcon.tint = 0x7f767f;
	counterIcon.anchor.set(0.5, 0.5);

	remainingPointsText = game.add.text((1.45 * game.world.centerX), (0.272 * game.world.centerY), `${traitValue}/${traitValue}`, counterFontProps);
	remainingPointsText.anchor.x = 0.5;
	remainingPointsText.anchor.y = 0.5;
	console.log(remainingPointsText);
}

/**
 * @function
 * @name displaySurrenderButton
 * @description Display the surrender option.
 */
function displaySurrenderButton () {
	surrenderButton = game.add.sprite(game.world.centerX,  15, 'surrenderButton');

	surrenderButton.scale.setTo(30 / surrenderButton.height);
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
	counterIcon.destroy();
	remainingPointsText.destroy()

	challenge = currentChallenge.challenge;
	stage = currentChallenge.stage;
	trait = currentChallenge.traits[0];
	traitName = trait.name;
	traitValue = trait.value;
	
	displayTrait();
	displayPointsLeft();
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