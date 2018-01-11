'use strict';

import { challengesList } from '../challenges/stages';
import * as endings from '../constants/endings';

let fontProps = {
	font: '18px Karla',
	fill: '#fff',
	align: 'center',
	boundsAlignH: 'center',
	boundsAlignV: 'middle',
	wordWrap: true,
	wordWrapWidth: 400
};

let game;
let ending;
let endingText;

/**
 * @function
 * @name displayEnding
 * @param { object } gameObject 
 * @description Display the ending of this game on screen
 */
function displayEnding (gameObject) {
    game = gameObject ? gameObject : game;

    let ending;
    ending = getEndingBasedOnResults();

    endingText = game.add.text(game.world.centerX, game.world.centerY, ending, fontProps);
    endingText.anchor.setTo(0.5, 0.5);
}

/**
 * @function
 * @name decideEndingsId
 * @description Calculate the failure times and decide which ending it is.
 */
function getEndingBasedOnResults () {
    let failureCounter = 0;
    for (let index = 0; index < challengesList.length; index++) {
        let currentChallenge = challengesList[index];
        if (currentChallenge.passed === false){
            failureCounter += 1;
        }
    }

    if (failureCounter === 0) {
        return endings.good;
    } else if (failureCounter === 1) {
        returnendings.neutral;
    } else if (failureCounter > 1) {
        return endings.bad;
    }
}

export  {
    displayEnding
}
