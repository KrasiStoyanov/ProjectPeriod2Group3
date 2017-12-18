'use strict';

import { currentChallenge } from '../challenges/stages';

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
let game;

let stageText;
let challengeText;
let traitText;
let remainingPointsText;

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
}

function displayStage () {
	stageText = game.add.text(game.world.centerX, 50, `${stage} life`, fontProps);

	stageText.anchor.x = 0.5;
	stageText.anchor.y = 0;
}

function displayTrait () {
	traitText = game.add.text(game.world.centerX, 215, `${traitName}: ${traitValue}`, fontProps);

	traitText.anchor.x = 0.5;
	traitText.anchor.y = 0;
}

function displayPointsLeft () {
	remainingPointsText = game.add.text(game.world.centerX, game.world.centerY, `${traitValue}/${traitValue}`, fontProps);

	remainingPointsText.anchor.x = 0.5;
	remainingPointsText.anchor.y = 0;
}

function updatePointsLeft (remainingPoints) {
	let initialPoints = traitValue;

	remainingPointsText.setText(`${remainingPoints}/${initialPoints}`);
}

function updateChallenge () {
	challenge = currentChallenge.challenge;
	stage = currentChallenge.stage;
	trait = currentChallenge.traits[0];
	traitName = trait.name;
	traitValue = trait.value;

	stageText.setText(stage);
	challengeText.setText(challenge);
	traitText.setText(`${traitName}: ${traitValue}`);
}

export {
	displayChallenge,
	updatePointsLeft,
	updateChallenge
}