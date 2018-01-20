'use strict';

import { traitProps, actionProps } from '../constants/actionCards';
import { getIdOfTraitIcon } from './helpers';
import { getSelectedPlayer } from '../player/helpers';
import * as playerInteraction from '../selection/playerInteraction';

const traitFontProps = {
	font: '16px Karla',
	fill: '#ffffff'
};

const actionFontProps = {
	font: '16px Karla',
	fill: '#131313',
	align: 'center',
	wordWrap: true
};

let game;
let topTrait;
let bottomTrait;
let action;
let traiticonSize;
let actionCardGroup;
let selectedPlayer;

let topTraitIcon;
let topTraitText;

let bottomTraitIcon;
let bottomTraitText;

let actionText;

/**
 * @function
 * @name generateActionCard
 * @param { object } card - The action card.
 * @param { object } gameObject - The game object.
 * @description Generate an action card.
 */
function generateActionCard (card, gameObject) {
	game = gameObject ? gameObject : game;

	selectedPlayer = getSelectedPlayer();
	actionCardGroup = game.add.sprite(0, 0, 'actionCardBack');
	
	actionCardGroup.inputEnabled = true;
	actionCardGroup.input.enableDrag(true);
	actionCardGroup.events.onDragStop.add(() => playerInteraction.placeActionCard(selectedPlayer, card), this);

	let traits = card.traits;
	action = card.action;
	topTrait = traits[0];
	bottomTrait = traits[1];
	traiticonSize = traitProps.icon.size;

	setTopTrait();

	actionCardGroup.addChild(topTraitIcon);
	actionCardGroup.addChild(topTraitText);

	setBottomTrait();

	actionCardGroup.addChild(bottomTraitIcon);
	actionCardGroup.addChild(bottomTraitText);

	setActionText();

	actionCardGroup.addChild(actionText);

	return actionCardGroup;
}

/**
 * @function
 * @name setTopTrait
 * @description Set the position of the top trait.
 */
function setTopTrait () {
	let topTraitIconIndex = getIdOfTraitIcon(topTrait.name);

	let topTraitIconX = traitProps.icon.margin.left;
	let topTraitIconY = traitProps.icon.margin.top;

	topTraitIcon = game.add.sprite(topTraitIconX, topTraitIconY, 'whiteTraits', topTraitIconIndex);
	topTraitIcon.scale.setTo(traiticonSize / topTraitIcon.width);

	let topTraitTextX = topTraitIconX + topTraitIcon.width + traitProps.text.margin.left;
	let topTraitTextY = topTraitIconY + traitProps.text.margin.top;

	topTraitText = game.add.text(topTraitTextX, topTraitTextY, topTrait.value, traitFontProps);
}

/**
 * @function
 * @name setBottomTrait
 * @description Set the position of the bottom trait.
 */
function setBottomTrait () {
	let bottomTraitIconIndex = getIdOfTraitIcon(bottomTrait.name);

	let bottomTraitIconX = actionCardGroup.width - (traitProps.icon.size + traitProps.icon.margin.right);
	let bottomTraitIconY = actionCardGroup.height - (traitProps.icon.size + traitProps.icon.margin.bottom);

	bottomTraitIcon = game.add.sprite(bottomTraitIconX, bottomTraitIconY, 'whiteTraits', bottomTraitIconIndex);
	bottomTraitIcon.scale.setTo(traiticonSize / bottomTraitIcon.width);

	let bottomTraitTextX = bottomTraitIconX - traitProps.text.margin.right;
	let bottomTraitTextY = bottomTraitIconY + traitProps.text.margin.top;

	bottomTraitText = game.add.text(bottomTraitTextX, bottomTraitTextY, bottomTrait.value, traitFontProps);
	bottomTraitText.anchor.set(1, 0);
}

/**
 * @function
 * @name setActionText
 * @description Set the action text.
 */
function setActionText () {
	let actionTextX = actionCardGroup.width / 2;
	let actionTextY = actionCardGroup.height / 2;

	actionText = game.add.text(actionTextX, actionTextY, action, actionFontProps);
	actionText.anchor.set(0.5, 0.5);
	actionText.wordWrapWidth = actionCardGroup.width - (actionProps.margin.left + actionProps.margin.right);
}

export {
	generateActionCard
}