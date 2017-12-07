let playState = {
	create: (game) => {

	},
	update: (game) => {

	},
	win: (game) => {
		game.state.start('win');
	},
	lose: (game) => {
		game.state.start('lose');
	}
};

export default playState;