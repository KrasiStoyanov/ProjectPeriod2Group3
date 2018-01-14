/** The limit of the deck size */
const limits = {
	minChallengeId: 0,
	maxChallengeId: 21 // Change when new action cards have been added
};

/** Positioning and dimensions of the traits */
const traitProps = {
	icon: {
		size: 20,
		margin: {
			top: 15,
			right: 15,
			bottom: 15,
			left: 15
		}
	},
	text: {
		margin: {
			top: 3,
			right: 6,
			bottom: 3,
			left: 6
		}
	}
};

/** Action text positioning */
const actionProps = {
	margin: {
		right: 20,
		left: 20
	}
};

export {
	limits,
	traitProps,
	actionProps
};