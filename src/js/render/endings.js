'use strict';

import { challengesList } from '../challenges/stages';
import { goodEnding, neutralEnding, badEnding } from '../constants/endings'

let fontProps = {
	font: '18px Karla',
	fill: '#fff',
	align: 'center',
	boundsAlignH: 'center',
	boundsAlignV: 'middle',
	wordWrap: true,
	wordWrapWidth: 400
};

let endingText;
let game;
let endingType;//0 is good ending,1 is neutral ending and 2 is bad ending

/**
 * @function
 * @name decideEndingsId
 * @description Calculate the failure times and decide which ending it is.
 */
function decideEndingsId() {
    let failureTimes = 0;
    for (let index = 0; index < challengesList.length; index++) {
        if (challengesList[index].passed === false){
            failureTimes++;
        }
    }
    if (failureTimes === 0) {
        endingType = 0;
    } else if (failureTimes === 1) {
        endingType = 1;
    } else if (failureTimes > 1) {
        endingType = 2;
    } else {
        endingType = 3;//invalid failure Times
    }
}

/**
 * @function
 * @name displayEnding
 * @param { object } gameObject 
 * @description Display the ending of this game on screen
 */
function displayEnding(gameObject) {
    game = gameObject;
    let currentEnding;
    decideEndingsId();
    switch (endingType) {
        case 0:
            currentEnding = goodEnding;
            break;
        case 1:
            currentEnding = neutralEnding;
            break;
        case 2:
            currentEnding = badEnding;
            break;
    }
    endingText = game.add.text(game.world.centerX, game.world.centerY, currentEnding, fontProps);
    endingText.anchor.setTo(0.5, 0.5);
}

export  {
    displayEnding
}
