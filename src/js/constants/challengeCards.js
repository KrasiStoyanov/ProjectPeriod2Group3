const stages = {
	early: "Early",
	mid: "Mid",
	late: "Late"
};

const stageLimits = {
	early: {
		minChallengeId: 0,
		maxChallengeId: 5 // Change when new challenges have been added
	},
	mid: {
		minChallengeId: 5, // Change when new challenges have been added
		maxChallengeId: 10 // Change when new challenges have been added
	},
	late: {
		minChallengeId: 10, // Change when new challenges have been added
		maxChallengeId: 15 // Change when new challenges have been added
	}
};

const roundsPerStage = 2;

export {
	stages,
	stageLimits,
	roundsPerStage
};