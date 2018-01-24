'use strict';

import { updateSelectedPlayerCards } from '../render/players';
import { surrender } from '../challenges/stages';
import { getDragAndDropBoundries } from '../render/challenges';
import { getSidePlayersGroup } from '../render/players';
import * as challengeCardConstants from '../constants/challengeCards';
import { suitablePlayersSuggestion } from '../player/helpers';

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

/**
 * @function
 * @name startDragging
 * @param { object } card - The card that is being dragged.
 * @param { Phaser.Sprite } sprite - The sprite that represents the card in the render.
 * @param { Phaser.Game } gameObject - The game object.
 * @description Manipulate the sprite based on its position.
 */
function startDragging (card, sprite, gameObject) {
	sprite.bringToTop();
	let suitablePlayers = suitablePlayersSuggestion(card);

	let sidePlayersGroup = getSidePlayersGroup();
	let sidePlayersGroupChildren = sidePlayersGroup.children;
	for (let index in sidePlayersGroupChildren) {
		let currentChild = sidePlayersGroupChildren[index];
		if (currentChild.name === 'group') {
			let isSuitable = false;
			for (let jndex in suitablePlayers) {
				let currentPlayer = suitablePlayers[jndex];
				if (currentChild.playerId === currentPlayer.id) {
					isSuitable = true;

					break;
				}
			}

			if (!isSuitable) {
				let characterThumbnail = currentChild.children[currentChild.children.length - 1];

				let darkenTween = game.add.tween(characterThumbnail);
				darkenTween.to({
					alpha: 0.1,
					tint: 0x121212
				}, 200, Phaser.Easing.Quadratic.InOut, true);
			}
		}
	}
}

/**
 * @function
 * @name dropCard
 * @param { object } player - The selected player.
 * @param { object } card - The card that is being dragged.
 * @param { Phaser.Sprite } sprite - The sprite that represents the card in the render.
 * @description Manipulate the sprite based on its position.
 */
function dropCard (player, card, sprite) {
	spritePosition = {
		top: sprite.worldPosition.y,
		right: sprite.worldPosition.x + sprite.width,
		bottom: sprite.worldPosition.y + sprite.height,
		left: sprite.worldPosition.x
	};

	isOverChallengeCard(player, card, sprite);
	isOverSidePlayer(player, card, sprite);
	sidePlayersToNormal();
}

/**
 * @function
 * @name sidePlayersToNormal
 * @description Return the side player thumbnails to normal after the card has been dropped.
 */
function sidePlayersToNormal () {
	let sidePlayersGroup = getSidePlayersGroup();
	let sidePlayersGroupChildren = sidePlayersGroup.children;
	for (let index in sidePlayersGroupChildren) {
		let currentChild = sidePlayersGroupChildren[index];
		if (currentChild.name === 'group') {
			let characterThumbnail = currentChild.children[currentChild.children.length - 1];

			let returnToNormalTween = game.add.tween(characterThumbnail);
			returnToNormalTween.to({
				alpha: 1,
				tint: 0xffffff
			}, 200, Phaser.Easing.Quadratic.InOut, true);
		}
	}
}

/**
 * @function
 * @name ifGoingToSidePlayers
 * @param { object } card - The card that is being dragged.
 * @param { Phaser.Sprite } sprite - The sprite that represents the card in the render.
 * @param { Phaser.Game } gameObject - The game object.
 * @description If the card is being dragged to the side players' area.
 */
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

/**
 * @function
 * @name isOverSidePlayersSide
 * @param { Phaser.Sprite } sprite - The sprite that represents the card in the render.
 * @description If the card is over the side players' area.
 */
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

/**
 * @function
 * @name isOverSidePlayersSide
 * @param { Phaser.Sprite } sprite - The sprite that represents the card in the render.
 * @param { boolean } shouldSmaller - If the card should be shrinked.
 * @description Change the size of the card depending on its position.
 */
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

/**
 * @function
 * @name moveCardBack
 * @param { Phaser.Sprite } sprite - The sprite that represents the card in the render.
 * @description If unsuccessfully placed, the card should be returned to its initial position.
 */
function moveCardBack (sprite) {
	let moveBackTween = game.add.tween(sprite);
	moveBackTween.to({
		x: sprite.variable.x,
		y: sprite.variable.y
	}, 350, Phaser.Easing.Quadratic.InOut, true);
	
	changeCardSize(sprite, false);
}

/**
 * @function
 * @name isOverSidePlayer
 * @param { object } player - The selected player.
 * @param { object } card - The card that is being dragged.
 * @param { Phaser.Sprite } sprite - The sprite that represents the card in the render.
 * @description If the card is over a certain side player.
 */
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
				let hasGiftedCard = player.giftCard(card, currentChild.playerId);
				if (!hasGiftedCard) {
					moveCardBack(sprite);
				} else {
					updateSelectedPlayerCards();
				}

			}
		}
	}
}

/**
 * @function
 * @name isOverSidePlayer
 * @param { object } player - The selected player.
 * @param { object } card - The card that is being dragged.
 * @param { Phaser.Sprite } sprite - The sprite that represents the card in the render.
 * @description If the card is over the challenge card.
 */
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

/**
 * @function
 * @name isOverAnElement
 * @param { object } boundries - The area in which the card should be.
 * @param { number } offset - If there is an offset set for that area.
 * @description If the card is over an element depending on the values of the variables.
 */
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
	startDragging,
	ifGoingToSidePlayers,
	dropCard,
	changeCardSize
}