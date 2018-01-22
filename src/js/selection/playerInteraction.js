'use strict';

import { updateSelectedPlayerCards } from '../render/players';
import { surrender } from '../challenges/stages';
import { getDragAndDropBoundries } from '../render/challenges';
import { getSidePlayersGroup } from '../render/players';
import * as challengeCardConstants from '../constants/challengeCards';

let game;
let hasPlacedCard;
let spritePosition;

/**
 * @function
 * @name onActionCardClick
 * @param { object } player - The player.
 * @param { object } card - The card.
 * @description Place card on user interaction.
 */
function placeActionCard (player, card) {
	hasPlacedCard = player.placeCard(card);
	if (hasPlacedCard) {
		updateSelectedPlayerCards();
	}
}

/**
 * @function
 * @name onSurrenderClick
 * @description Call the back end functionality for surrender and update render.
 */
function onSurrenderClick () {
	surrender();
	updateSelectedPlayerCards();
}

function dropCard (player, card, sprite) {
	spritePosition = {
		top: sprite.worldPosition.y,
		right: sprite.worldPosition.x + sprite.width,
		bottom: sprite.worldPosition.y + sprite.height,
		left: sprite.worldPosition.x
	};

	isOverChallengeCard(player, card, sprite);
	isOverSidePlayer(player, card, sprite);
}

function ifGoingToSidePlayers (card, sprite, gameObject) {
	game = gameObject ? gameObject : game;

	spritePosition = {
		top: sprite.worldPosition.y,
		right: sprite.worldPosition.x + sprite.width,
		bottom: sprite.worldPosition.y + sprite.height,
		left: sprite.worldPosition.x
	};

	isOverSidePlayersSide(sprite);
}

function isOverSidePlayersSide (sprite) {
	let dragAndDropBoundries = {
		top: 0,
		right: game.world.width / 4,
		bottom: game.world.height,
		left: 0
	};

	let shouldSmallerCard = isOverAnElement(dragAndDropBoundries, 0);
	changeCardSize(sprite, shouldSmallerCard);
}

function changeCardSize (sprite, shouldSmaller) {
	let changeCardSizeTween = game.add.tween(sprite);
	if (shouldSmaller) {
		changeCardSizeTween.to({
			width: sprite.originalSize.width / 1.5,
			height: sprite.originalSize.height / 1.5
		}, 100, Phaser.Easing.Quadratic.InOut, true);
	} else {
		changeCardSizeTween.to({
			width: sprite.originalSize.width,
			height: sprite.originalSize.height
		}, 100, Phaser.Easing.Quadratic.InOut, true);
	}
}

function moveCardBack (sprite) {
	let moveBackTween = game.add.tween(sprite);
	moveBackTween.to({
		x: sprite.variable.x,
		y: sprite.variable.y
	}, 350, Phaser.Easing.Quadratic.InOut, true);
	
	changeCardSize(sprite, false);
}

function isOverSidePlayer (player, card, sprite) {
	let sidePlayersGroup = getSidePlayersGroup();
	let sidePlayersGroupChildren = sidePlayersGroup.children;
	for (let index in sidePlayersGroupChildren) {
		let currentChild = sidePlayersGroupChildren[index];
		if (currentChild.name === 'group') {
			let dragAndDropBoundries = {
				top: currentChild.y,
				right: currentChild.x + currentChild.width,
				bottom: currentChild.y + currentChild.height,
				left: currentChild.x
			};

			let shouldGiftCardToPlayer = isOverAnElement(dragAndDropBoundries, 0);
			if (shouldGiftCardToPlayer) {
				player.giftCard(card, currentChild.playerId);

				updateSelectedPlayerCards();
			}
		}
	}
}

function isOverChallengeCard (player, card, sprite) {
	let dragAndDropBoundries = getDragAndDropBoundries();
	let shouldPlaceCard = isOverAnElement(dragAndDropBoundries, challengeCardConstants.dragAndDropBoundriesOffset);
	if (shouldPlaceCard) {
		placeActionCard(player,card);
		if (!hasPlacedCard) {
			moveCardBack(sprite);
		}
	} else {
		moveCardBack(sprite);
	}
}

function isOverAnElement (boundries, offset) {
	let isInTopBoundriesOfChallengeCard = {
		min: spritePosition.top <= boundries.bottom + offset,
		max: spritePosition.top >= boundries.top - offset
	};

	let isInRightBoundriesOfChallengeCard = {
		min: spritePosition.right >= boundries.left - offset,
		max: spritePosition.right <= boundries.right + offset
	};

	let isInBottomBoundriesOfChallengeCard = {
		min: spritePosition.bottom <= boundries.bottom + offset,
		max: spritePosition.bottom >= boundries.top - offset
	};

	let isInLeftBoundriesOfChallengeCard = {
		min: spritePosition.left >= boundries.left - offset,
		max: spritePosition.left <= boundries.right + offset
	};

	if (isInTopBoundriesOfChallengeCard.min && isInTopBoundriesOfChallengeCard.max) {
		if (isInRightBoundriesOfChallengeCard.min && isInRightBoundriesOfChallengeCard.max) {			
			return true;
		} else if (isInLeftBoundriesOfChallengeCard.min && isInLeftBoundriesOfChallengeCard.max) {			
			return true;
		}
	} else if (isInRightBoundriesOfChallengeCard.min && isInRightBoundriesOfChallengeCard.max) {
		if (isInTopBoundriesOfChallengeCard.min && isInTopBoundriesOfChallengeCard.max) {			
			return true;
		} else if (isInBottomBoundriesOfChallengeCard.min && isInBottomBoundriesOfChallengeCard.max) {			
			return true;
		}
	} else if (isInBottomBoundriesOfChallengeCard.min && isInBottomBoundriesOfChallengeCard.max) {
		if (isInRightBoundriesOfChallengeCard.min && isInRightBoundriesOfChallengeCard.max) {			
			return true;
		} else if (isInLeftBoundriesOfChallengeCard.min && isInLeftBoundriesOfChallengeCard.max) {			
			return true;
		}
	} else if (isInLeftBoundriesOfChallengeCard.min && isInLeftBoundriesOfChallengeCard.max) {
		if (isInTopBoundriesOfChallengeCard.min && isInTopBoundriesOfChallengeCard.max) {			
			return true;
		} else if (isInBottomBoundriesOfChallengeCard.min && isInBottomBoundriesOfChallengeCard.max) {			
			return true;
		}
	} else {
		return false;
	}
}

export {
	placeActionCard,
	onSurrenderClick,
	ifGoingToSidePlayers,
	dropCard
}