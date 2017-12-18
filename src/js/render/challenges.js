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

function displayChallenge (game) {
	challenge = currentChallenge.challenge;
	stage = currentChallenge.stage;
	trait = currentChallenge.traits[0];
	traitName = trait.name;
	traitValue = trait.value;

	displayStage(game);
	displayTrait(game);

	let challengeText = game.add.text(game.world.centerX, 100, challenge, fontProps);
	challengeText.anchor.x = 0.5;
	challengeText.anchor.y = 0;
}

function displayStage (game) {
	let stageText = game.add.text(game.world.centerX, 50, `${stage} life`, fontProps);

	stageText.anchor.x = 0.5;
	stageText.anchor.y = 0;
}

function displayTrait (game) {
	let traitText = game.add.text(game.world.centerX, 215, `${traitName}: ${traitValue}`, fontProps);

	traitText.anchor.x = 0.5;
	traitText.anchor.y = 0;
}

export {
	displayChallenge
}