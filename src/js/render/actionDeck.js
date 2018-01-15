'use strict';

import * as actionDeck from '../decks/actionDeck';

let game;
let fontProps = {
    font: '25px Karla',
    fill: 'rgba(255, 255, 255, .7)'
};

let deckRemain;

/**
 * @function
 * @name displayDeck
 * @description display deck.png
 */
function displayDeck () {
    let deck = game.add.sprite(300, 300, 'deck');
};

/**
 * @function
 * @name displayDeckCiunter
 * @param game
 * @description display deck counter
 */
function displayDeckCounter (gameObject) {
    game = gameObject ? gameObject : game;
    let cardsLeft = actionDeck.cardsLeft();

    deckRemain = game.add.text(350, 250, cardsLeft, fontProps);

}

/**
 * @function
 * @name updateDeckCounter
 * @description update the deck counter
 */
function updateDeckCounter () {
    let cardsLeft = actionDeck.cardsLeft();

    deckRemain.setText(cardsLeft);
}


export {
    displayDeck,
    displayDeckCounter,
    updateDeckCounter
}