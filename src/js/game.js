'use strict';

import loadState from './states/load';
import menuState from './states/menu';
import playerSelectionState from './states/playerSelection';
import mainScreenState from './states/mainScreen';
import winState from './states/win';

let game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-wrapper');

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('playerSelection', playerSelectionState);
game.state.add('mainScreen', mainScreenState);
game.state.add('win', winState);

game.state.start('load');

export default game;