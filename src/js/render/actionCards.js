'use strict';

import { traitProps, actionProps } from '../constants/actionCards';
import { getIdOfTraitIcon } from './helpers';

const traitFontProps = {
	font: '12px Karla',
	fill: '#ffffff'
};

const actionFontProps = {
	font: '12px Karla',
	fill: '#131313',
	textAlign: 'center'
};

let game;
let topTrait;
let bottomTrait;
let action;
let traiticonSize;
let backOfActionCard;

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

	let actionCardGroup = game.add.group();
	let topTraitGroup = game.add.group();
	let bottomTraitGroup = game.add.group();

	backOfActionCard = game.add.sprite(0, 0, 'actionCardBack');

	let traits = card.traits;
	action = card.action;
	topTrait = traits[0];
	bottomTrait = traits[1];
	traiticonSize = traitProps.icon.size;

	setTopTrait();

	topTraitGroup.add(topTraitIcon);
	topTraitGroup.add(topTraitText);

	setBottomTrait();

	bottomTraitGroup.add(bottomTraitIcon);
	bottomTraitGroup.add(bottomTraitText);

	setActionText();

	actionCardGroup.add(backOfActionCard);
	actionCardGroup.add(topTraitGroup);
	actionCardGroup.add(bottomTraitGroup);
	actionCardGroup.add(actionText);
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

	let topTraitTextX = traitProps.icon.margin.left + topTraitIcon.height + traitProps.text.margin.left;
	let topTraitTextY = traitProps.icon.margin.top + traitProps.text.margin.top;

	topTraitText = game.add.text(topTraitTextX, topTraitTextY, topTrait.value, traitFontProps);
}

/**
 * @function
 * @name setBottomTrait
 * @description Set the position of the bottom trait.
 */
function setBottomTrait () {
	let bottomTraitIconIndex = getIdOfTraitIcon(bottomTrait.name);

	let bottomTraitIconX = backOfActionCard.width - (traitProps.icon.size + traitProps.icon.margin.right);
	let bottomTraitIconY = backOfActionCard.height - (traitProps.icon.size + traitProps.icon.margin.bottom);

	bottomTraitIcon = game.add.sprite(bottomTraitIconX, bottomTraitIconY, 'whiteTraits', bottomTraitIconIndex);
	bottomTraitIcon.scale.setTo(traiticonSize / bottomTraitIcon.width);

	let bottomTraitTextX = bottomTraitIconX - traitProps.text.margin.right;
	let bottomTraitTextY = bottomTraitIconY + traitProps.text.margin.top;

	bottomTraitText = game.add.text(bottomTraitTextX, bottomTraitTextY, topTrait.value, traitFontProps);
}

function setActionText () {
	let actionTextX = backOfActionCard.width / 2;
	let actionTextY = backOfActionCard.height / 2;

	actionText = game.add.text(actionTextX, actionTextY, action, actionFontProps);
	actionText.anchor.set(0.5, 0.5);
}

export {
	generateActionCard
}