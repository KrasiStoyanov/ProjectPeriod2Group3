'use strict';

let loadState = {
	/**
	 * @function
	 * @name preload
 	 * @param { Phaser.Game } gameObject - The game object.
	 * @description Load all assets for the game.
	 */
	preload: (game) => {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.load.image('playButton', './src/images/playButton.png');
		game.load.image('characterCard1', './src/images/character-1.png');
		game.load.image('characterCard2', './src/images/character-2.png');
		game.load.image('characterCard3', './src/images/character-3.png');
		game.load.image('characterCard4', './src/images/character-4.png');
		game.load.image('characterCard5', './src/images/character-5.png');
		game.load.image('characterCard6', './src/images/character-6.png');
		game.load.image('characterCard7', './src/images/character-7.png');
		game.load.image('characterCard8', './src/images/character-8.png');

		game.load.image('characterCard1Back',"./src/images/character-1-back.png")
		game.load.image('characterCard2Back', './src/images/character-2-back.png');
		game.load.image('characterCard3Back', './src/images/character-3-back.png');
		game.load.image('characterCard4Back', './src/images/character-4-back.png');
		game.load.image('characterCard5Back', './src/images/character-5-back.png');
		game.load.image('characterCard6Back', './src/images/character-6-back.png');
		game.load.image('characterCard7Back', './src/images/character-7-back.png');
		game.load.image('characterCard8Back', './src/images/character-8-back.png');


		game.load.spritesheet('positiveTraits', './src/images/trait-icons-positive-spritesheet.png', 36, 36, 5);
		game.load.spritesheet('negativeTraits', './src/images/trait-icons-negative-spritesheet.png', 36, 36, 5);
		game.load.spritesheet('whiteTraits', './src/images/trait-icons-white-spritesheet.png', 50, 50, 5);
		game.load.spritesheet('grayTraits', './src/images/trait-icons-gray-spritesheet.png', 81, 81, 5);

		game.load.spritesheet('passedChallengeStatus', './src/images/passed-challenge-status.png');
		game.load.spritesheet('failedChallengeStatus', './src/images/failed-challenge-status.png');

		game.load.image('actionCardBack', './src/images/action-card-back.png');
		game.load.image('challengeCardBack', './src/images/challenge-card-back.png');

		game.load.image('Bart', './src/images/Bart.png');
		game.load.image('Carlos', './src/images/Carlos.png');
		game.load.image('Elisa', './src/images/Elisa.png');
		game.load.image('Fiona', './src/images/Fiona.png');
		game.load.image('Jenny', './src/images/Jenny.png');
		game.load.image('John', './src/images/John.png');
		game.load.image('Mark', './src/images/Mark.png');
		game.load.image('Stefania', './src/images/Stefania.png');

		game.load.image('deck', './src/images/Deck.png');

		game.load.image('logo', './src/images/logo.png');
		game.load.image('whiteTransparentLogo', './src/images/white-transparent-logo.png');

		game.load.image('waves', './src/images/waves.png');
		game.load.image('wavesCopy', './src/images/waves.png');

		game.load.image('surrenderButton', './src/images/surrenderButton.png');

		game.load.image('good','./src/images/Robin_good.png')
		game.load.image('neutral','./src/images/Robin_neutral.png')
		game.load.image('bad','./src/images/Robin_bad.png')
		game.load.image('againLight','./src/images/TRY AGAIN_white.png')
		game.load.image('againDark','./src/images/TRY AGAIN_dark.png')
	},
	
	/**
	 * @function
	 * @name create
 	 * @param { Phaser.Game } gameObject - The game object.
	 * @description When done with the preload function, go to next state.
	 */
	create: (game) => {
		game.state.start('menu');
	}
};

export default loadState;