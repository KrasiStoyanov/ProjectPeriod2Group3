'use strict';

import { challengesList } from '../challenges/stages';
import * as endings from '../constants/endings';
import { backgroundColors } from '../constants/mainMenu';

let fontProps = {
	font: '34px Karla',
	fill: '#fff',
	align: 'center',
	boundsAlignH: 'center',
	boundsAlignV: 'middle',
	wordWrap: true,
	wordWrapWidth: 1500
};

let game;
let ending;
let endingText;
let failureCounter = 0;

/**
 * @function
 * @name displayEnding
 * @param { Phaser.Game } gameObject - The game object.
 * @description Display the ending.
 */
function displayEnding (gameObject) {
    game = gameObject ? gameObject : game;

    let ending;
    ending = getEndingBasedOnResults();

    game.stage.backgroundColor = '#000000';
    displayBackground();

    endingText = game.add.text(game.world.centerX, (game.world.centerY * 1.15), ending, fontProps);
    endingText.anchor.setTo(0.5, 0.5);
}

/**
 * @function
 * @name tryAgainDown
 * @param { object } button - The button which is being clicked.
 * @description Change to main menu state.
 */
function tryAgainDown (button) {
    window.location.reload();
}

/**
 * @function
 * @name displayBackground
 * @param { Phaser.Game } gameObject - The game object.
 * @description Display all the element except the text.
 */
function displayBackground (gameObject) {
    game = gameObject ? gameObject : game;

    let backgroundGroup = game.add.group();
    let backgroundRect = new Phaser.Graphics(game, 0, 0);
    let rectColor;
    let robinFace;
    let tryAgainButton;
    let robin;
    let tryAgain;

    if (failureCounter === 0) {
        rectColor = 0x6de3cd;
        tryAgainButton = 'againDark';
        robinFace = 'good';
    } else if (failureCounter === 1) {
        rectColor = 0x356766;
        tryAgainButton = 'againLight';
        robinFace = 'neutral';
    } else if (failureCounter > 1) {
        rectColor = 0x343434;
        tryAgainButton = 'againLight';
        robinFace = 'bad';
    }

    backgroundRect.beginFill(rectColor);
    backgroundRect.drawRoundedRect (20, 20, (game.world.width - 40), (game.world.height - 40), 15);
    backgroundRect.endFill();
    backgroundGroup.add(backgroundRect);

    robin = game.add.sprite(game.world.centerX, 140, robinFace);
    robin.anchor.setTo(0.5, 0.5);
    robin.scale.setTo(1.1, 1.1);

    tryAgain = game.add.sprite((game.world.width - 200), (game.world.height - 76), tryAgainButton);
    tryAgain.anchor.setTo(0.5, 0.5);
    tryAgain.inputEnabled = true;
    tryAgain.events.onInputDown.add(tryAgainDown, this);
}

/**
 * @function
 * @name decideEndingsId
 * @return { string } The correct ending.
 * @description Get the proper ending based on the results.
 */
function getEndingBasedOnResults () {
    for (let index = 0; index < challengesList.length; index++) {
        let currentChallenge = challengesList[index];
        if (currentChallenge.passed === false){
            failureCounter += 1;
        }
    }

    if (failureCounter === 0) {
        return endings.good;
    } else if (failureCounter === 1) {
        return endings.neutral;
    } else if (failureCounter > 1) {
        return endings.bad;
    }
}

export  {
    displayEnding
}
