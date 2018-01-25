'use strict';

import { getHowManyChallengesHavePassed, getChallengesList } from '../challenges/stages';
import { stages, roundsPerStage } from '../constants/challengeCards';
import * as progressBarConstants from '../constants/progressBar';

let game;
let progressBarGroup;
let barGroup;

function displayProgressBar (gameObjet) {
	game = gameObjet ? gameObjet : game;

	progressBarGroup = game.add.group();
	progressBarGroup.x = 0;
	progressBarGroup.y = 0;

	let background = new Phaser.Graphics(game, 0, 0);
	let backgroundX = 0;
	let backgroundY = 0;
	let backgroundWidth = progressBarConstants.progressBar.margin.left + progressBarConstants.barWidth + progressBarConstants.progressBar.margin.right;
	let backgroundHeight = game.world.height;

	background.beginFill(0xffffff);
	background.drawRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
	background.endFill();

	progressBarGroup.add(background);

	renderBars();
}

function updateProgressBar () {
	progressBarGroup.removeAll(true);

	displayProgressBar();
	updateStatus();
}

function renderBars () {
	let maxAmountOfChallenges = Object.keys(stages).length * roundsPerStage;
	let amountOfTabsToBeColored = getHowManyChallengesHavePassed() + 1;
	let gameHeight = game.world.height;

	let barWidth = progressBarConstants.barWidth;
	let barHeight = gameHeight / maxAmountOfChallenges;

	for (let index = 0; index < maxAmountOfChallenges; index += 1) {
		barGroup = game.add.group();

		let colors = progressBarConstants.dullBarColors;
		// SHITTY HACK - REMOVE IT FOR LATER UPDATES
		if (index >= maxAmountOfChallenges - amountOfTabsToBeColored) {
			colors = progressBarConstants.barColors;
		}

		let currentBarColor = getCurrentBarColor(maxAmountOfChallenges - index - 1, colors);
		let barX = progressBarConstants.progressBar.margin.left;
		let barY = (barHeight * index) - progressBarConstants.barPointerHeight;

		barGroup.x = barX;
		barGroup.y = barY;

		renderBar(0, progressBarConstants.barPointerHeight, barWidth, barHeight, currentBarColor);
		renderPointer(0, 0, currentBarColor);

		progressBarGroup.add(barGroup);
	}
}

function renderBar (x, y, width, height, color) {
	let bar = new Phaser.Graphics(game, 0, 0);

	bar.beginFill(color);
	bar.drawRect(x, y, width, height);
	bar.endFill();

	barGroup.add(bar);
}

function renderPointer (x, y, color) {
	let pointer = new Phaser.Graphics(game, 0, 0);

	pointer.beginFill(color);
	pointer.moveTo(x, y + progressBarConstants.barPointerHeight);
	pointer.lineTo(x + progressBarConstants.barWidth / 2, y);
	pointer.lineTo(x + progressBarConstants.barWidth, y + progressBarConstants.barPointerHeight);
	pointer.lineTo(x, y + progressBarConstants.barPointerHeight);
	pointer.endFill();

	barGroup.add(pointer);
}

function colorBars () {
	progressBarGroup = progressBarGroup ? progressBarGroup : game.add.group();

	let normalColors = progressBarConstants.barColors;
	let amountOfTabsToBeColored = getHowManyChallengesHavePassed();
	let progressBarChildren = progressBarGroup.children;

	for (let index = progressBarChildren.length - 1; index >= 0; index -= 1) {
		let child = progressBarChildren[index];
		if (child.name === 'group') {
			if (amountOfTabsToBeColored > 0) {
				changeColorOfBar(child, normalColors);

				amountOfTabsToBeColored--;	
			} else {
				break;
			}
		}
	}
}

function getCurrentBarColor (barIndex, colors) {
	let allObjectKeys = Object.keys(colors);
	let currentObjectKey = allObjectKeys[barIndex];
	let currentBarColor = colors[currentObjectKey];

	barGroup.variable = currentObjectKey;

	return currentBarColor;
}

function darkenBarColors () {
	let dullColors = progressBarConstants.dullBarColors;

	progressBarGroup.forEach((child) => {
		if (child.name === 'group') {
			changeColorOfBar(child, dullColors);
		}
	}, this);
}

function changeColorOfBar (bar, colors) {
	let objectKey = bar.variable;
	let newColor = colors[objectKey];

	bar.forEach((barChild) => {
		barChild.graphicsData[0].fillColor = newColor;
	}, this);
}

function updateStatus () {
	let challengesList = getChallengesList();
	let progressBarChildren = progressBarGroup.children;
	let progressBarLength = progressBarChildren.length;

	for (let index = 0; index < challengesList.length; index += 1) {
		let currentChallenge = challengesList[index];
		for (let jndex = progressBarLength - 1; jndex >= 0; jndex -= 1) {
			let child = progressBarChildren[jndex];
			if (child.name === 'group') {
				if (jndex === progressBarLength - (index + 1)) {
					let iconX = child.width / 2;
					let iconY = child.height / 2;
					let icon;

					if (currentChallenge.passed) {
						icon = game.add.sprite(iconX, iconY, 'passedChallengeStatus');
					} else {
						icon = game.add.sprite(iconX, iconY, 'failedChallengeStatus');
					}

					icon.anchor.set(0.5, 0.5);
					icon.scale.setTo(35 / icon.width);

					child.add(icon);
				}
			}
		}
	}
}

export {
	displayProgressBar,
	updateProgressBar
}