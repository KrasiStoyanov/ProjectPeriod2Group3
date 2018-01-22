/** The challenge stages */
const stages = {
	early: "Early",
	mid: "Mid",
	late: "Late"
};

const dragAndDropBoundriesOffset = 60;

/** Sizes */
const size = {
	height: 420
};

/** Stage text margins */
const stageMargin = {
	top: 30,
	bottom: 30
};

/** Challenge text margins */
const challengeTextMargin = {
	top: 50,
	right: 20,
	bottom: 50,
	left: 20
};

const traitIcon = {
	height: 50,
	margin: {
		top: 10,
		bottom: 10
	}
};

const remainingPoints = {
	icon: {
		size: {
			height: 80
		},
		margin: {
			left: 15
		}
	},
	margin: {
		left: 50
	}
}

/** The rounds per stage */
const roundsPerStage = 2;

export {
	stages,
	dragAndDropBoundriesOffset,
	size,
	stageMargin,
	challengeTextMargin,
	traitIcon,
	remainingPoints,
	roundsPerStage
};