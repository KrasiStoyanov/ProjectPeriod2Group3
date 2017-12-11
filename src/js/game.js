'use strict';

import loadState from './states/load';
import menuState from './states/menu';
import mainScreenState from './states/mainScreen';
import playState from './states/play';
import winState from './states/win';
import loseState from './states/lose';

let game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-wrapper');

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('mainScreen', mainScreenState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);

game.state.start('load');

export default game;