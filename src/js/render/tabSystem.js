'use strict';

import { generateActionCard } from './actionCards';
import { getSelectedPlayer } from '../player/helpers';
import * as actionCardConstants from '../constants/actionCards';
import * as tabSystemConstants from '../constants/tabSystem';
import * as playerHelpers from '../player/helpers';

let game;
let tabSystemGroup;
let listOfCardsGroup;
let tabGroup;
let maxAmountOfVisibleCards;
let background;
let previousCardX = actionCardConstants.margin.left;
let previousCardId = 0;
let currentTab = 1;

function displayTabSystem (whichTab) {
	tabSystemGroup = game.add.group();
	listOfCardsGroup = game.add.group();

	whichTab = whichTab ? whichTab : currentTab;
	currentTab = whichTab;

	background = new Phaser.Graphics(game, 0, 0);

	let marginLeft = tabSystemConstants.margin.left;
	let actionCardWidth = actionCardConstants.size.width;
	let actionCardMarginLeft = actionCardConstants.margin.left;
	let actionCardMarginRight = actionCardConstants.margin.right;
	maxAmountOfVisibleCards = (game.world.width - tabSystemConstants.margin.left) / (actionCardWidth + actionCardMarginLeft);
	maxAmountOfVisibleCards = Math.floor(maxAmountOfVisibleCards);

	let selectedPlayer = playerHelpers.getSelectedPlayer();
	let cardsInHand = selectedPlayer.cardsInHand;
	if (cardsInHand.length > maxAmountOfVisibleCards) {
		displayTabs();
	} else {
		updateTabs();
	}

	let heightOfTabSystem = tabSystemConstants.size.height;
	let widthOfTabSystem = maxAmountOfVisibleCards * (actionCardWidth + actionCardMarginLeft) + actionCardMarginRight;

	let tabSystemX = game.world.width - widthOfTabSystem;
	let tabSystemY = game.world.height - heightOfTabSystem;
	widthOfTabSystem += 15;
	heightOfTabSystem += 15;

	background.beginFill(0x9ca2ae);
	background.drawRoundedRect(0, 0, widthOfTabSystem, heightOfTabSystem, 15);
	background.endFill();

	tabSystemGroup.x = tabSystemX;
	tabSystemGroup.y = tabSystemY;

	listOfCardsGroup.x = 0;
	listOfCardsGroup.y = 0;

	tabSystemGroup.add(background);
	tabSystemGroup.add(listOfCardsGroup);

	renderCards();
}

function updateTabSystem (gameObject) {
	game = gameObject ? gameObject : game;

	listOfCardsGroup = listOfCardsGroup ? listOfCardsGroup : game.add.group();
	listOfCardsGroup.removeAll(true);

	previousCardId = 0;
	previousCardX = actionCardConstants.margin.left;

	displayTabSystem();
}

function displayTabs () {
	let selectedPlayer = playerHelpers.getSelectedPlayer();
	let cardsInHand = selectedPlayer.cardsInHand;
	let tabNumber = Math.ceil(cardsInHand.length / maxAmountOfVisibleCards);

	tabGroup = tabGroup ? tabGroup : game.add.group();
	if (tabNumber > 1) {
		let labelX = tabSystemConstants.tab.size.width / 2;
		let labelY = tabSystemConstants.tab.size.height / 2;
		for (let index = 0; index < tabNumber; index += 1) {
			let tabNumber = index + 1;
			let group = game.add.group();
			group.inputEnableChildren = true;

			let rectangle = new Phaser.Graphics(game, 0, 0);
			if (tabNumber === currentTab) {
				rectangle.beginFill(tabSystemConstants.tab.colors.selected);
			} else {
				rectangle.beginFill(tabSystemConstants.tab.colors.notSelected);
			}

			rectangle.drawRoundedRect(0, 0, tabSystemConstants.tab.size.width, tabSystemConstants.tab.size.height, 15);
			rectangle.endFill();
			
			rectangle.inputEnabled = true;
			rectangle.events.onInputDown.add(() => {
				updateTabs(index + 1);
				renderCards();
			}, this);

			let label = game.add.text(labelX, labelY, tabNumber, { font: '14px Karla', fill: '#fff' });
			label.anchor.set(0.5, 0.5);
			
			label.inputEnabled = true;
			label.events.onInputDown.add(() => {
				updateTabs(index + 1);
				renderCards();
			}, this);

			group.add(rectangle);
			group.add(label);

			group.x = index * tabSystemConstants.tab.size.width;

			tabGroup.add(group);
		}

		tabGroup.x = tabSystemConstants.tab.margin.left;
		tabGroup.y = -(tabSystemConstants.tab.size.height - 15);

		tabSystemGroup.add(tabGroup);
		tabSystemGroup.bringToTop(background);
		tabSystemGroup.bringToTop(listOfCardsGroup);
	}
}

function destroyTabs () {
	tabGroup = tabGroup ? tabGroup : game.add.group();

	tabGroup.removeAll(true);
}

function updateTabs (whichTab) {
	currentTab = whichTab;

	destroyTabs();
	displayTabs(whichTab);
}

function renderCards () {
	listOfCardsGroup.removeAll(true);
	if (currentTab === 1) {
		previousCardId = 0;
	} else if (currentTab  === 2) {
		previousCardId = maxAmountOfVisibleCards;
	}

	previousCardX = actionCardConstants.margin.left;

	let selectedPlayer = playerHelpers.getSelectedPlayer();
	let cardsInHand = selectedPlayer.cardsInHand;
	for (let index = previousCardId; index < previousCardId + maxAmountOfVisibleCards; index += 1) {
		let currentCard = cardsInHand[index];
		if (currentCard === undefined) {
			break;
		}

		renderCard(currentCard);
	}
}

function renderCard (card) {
	let generatedCard = generateActionCard(card, game);

	generatedCard.anchor.set(0, 0);
	generatedCard.scale.setTo(actionCardConstants.size.height / generatedCard.height);
	generatedCard.x = previousCardX;
	generatedCard.y = actionCardConstants.margin.top;

	previousCardX = previousCardX + actionCardConstants.size.width + actionCardConstants.margin.left;

	listOfCardsGroup.add(generatedCard);
}

export {
	displayTabSystem,
	updateTabSystem
}