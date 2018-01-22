'use strict';

import { updateSelectedPlayerCards } from '../render/players';
import { surrender } from '../challenges/stages';
import { getDragAndDropBoundries } from '../render/challenges';
import * as challengeCardConstants from '../constants/challengeCards';

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
	let hasPlacedCard = player.placeCard(card);
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
}

function isOverSidePlayer () {
	// TODO: Connect the gifting mechanic with the sprite drag and drop
}

function isOverChallengeCard (player, card, sprite) {
	let dragAndDropBoundries = getDragAndDropBoundries();
	let isInTopBoundriesOfChallengeCard = {
		min: spritePosition.top <= dragAndDropBoundries.bottom + challengeCardConstants.dragAndDropBoundriesOffset,
		max: spritePosition.top >= dragAndDropBoundries.top - challengeCardConstants.dragAndDropBoundriesOffset
	};

	let isInRightBoundriesOfChallengeCard = {
		min: spritePosition.right >= dragAndDropBoundries.left - challengeCardConstants.dragAndDropBoundriesOffset,
		max: spritePosition.right <= dragAndDropBoundries.right + challengeCardConstants.dragAndDropBoundriesOffset
	};

	let isInBottomBoundriesOfChallengeCard = {
		min: spritePosition.bottom <= dragAndDropBoundries.bottom + challengeCardConstants.dragAndDropBoundriesOffset,
		max: spritePosition.bottom >= dragAndDropBoundries.top - challengeCardConstants.dragAndDropBoundriesOffset
	};

	let isInLeftBoundriesOfChallengeCard = {
		min: spritePosition.left >= dragAndDropBoundries.left - challengeCardConstants.dragAndDropBoundriesOffset,
		max: spritePosition.left <= dragAndDropBoundries.right + challengeCardConstants.dragAndDropBoundriesOffset
	};

	if (isInTopBoundriesOfChallengeCard.min && isInTopBoundriesOfChallengeCard.max) {
		if (isInRightBoundriesOfChallengeCard.min && isInRightBoundriesOfChallengeCard.max) {
			placeActionCard(player, card);
		} else if (isInLeftBoundriesOfChallengeCard.min && isInLeftBoundriesOfChallengeCard.max) {
			placeActionCard(player, card);
		}
	} else if (isInRightBoundriesOfChallengeCard.min && isInRightBoundriesOfChallengeCard.max) {
		if (isInTopBoundriesOfChallengeCard.min && isInTopBoundriesOfChallengeCard.max) {
			placeActionCard(player, card);
		} else if (isInBottomBoundriesOfChallengeCard.min && isInBottomBoundriesOfChallengeCard.max) {
			placeActionCard(player, card);
		}
	} else if (isInBottomBoundriesOfChallengeCard.min && isInBottomBoundriesOfChallengeCard.max) {
		if (isInRightBoundriesOfChallengeCard.min && isInRightBoundriesOfChallengeCard.max) {
			placeActionCard(player, card);
		} else if (isInLeftBoundriesOfChallengeCard.min && isInLeftBoundriesOfChallengeCard.max) {
			placeActionCard(player, card);
		}
	} else if (isInLeftBoundriesOfChallengeCard.min && isInLeftBoundriesOfChallengeCard.max) {
		if (isInTopBoundriesOfChallengeCard.min && isInTopBoundriesOfChallengeCard.max) {
			placeActionCard(player, card);
		} else if (isInBottomBoundriesOfChallengeCard.min && isInBottomBoundriesOfChallengeCard.max) {
			placeActionCard(player, card);
		}
	} else {
		sprite.x = sprite.variable.x;
		sprite.y = sprite.variable.y;
	}

	if (!hasPlacedCard) {
		sprite.x = sprite.variable.x;
		sprite.y = sprite.variable.y;
	}
}

export {
	placeActionCard,
	onSurrenderClick,
	dropCard
}