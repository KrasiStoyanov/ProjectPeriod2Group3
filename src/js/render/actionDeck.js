'use strict';

import * as actionDeck from '../decks/actionDeck';

let game;
let fontProps = {
    font: '25px Karla',
    fill: 'rgba(255, 255, 255, .7)'
};

let cardsLeftText;

/**
 * @function
 * @name displayDeck
 * @description display deck.png
 */
function displayDeck () {
    let deck = game.add.sprite(300, 300, 'deck');
    deck.anchor.set(0.5, 0.5);
}

/**
 * @function
 * @name displayDeckCounter
 * @param game
 * @description display deck counter
 */
function displayDeckCounter (gameObject) {
    game = gameObject ? gameObject : game;

    let cardsLeft = actionDeck.cardsLeft();
    cardsLeftText = game.add.text(300, 150, cardsLeft, fontProps);
    cardsLeftText.anchor.x= 0.5;
    cardsLeftText.anchor.y= 0.5;
}

/**
 * @function
 * @name updateDeckCounter
 * @description update the deck counter
 */
function updateDeckCounter () {
    let cardsLeft = actionDeck.cardsLeft();

    cardsLeftText.setText(cardsLeft);
}


export {
    displayDeck,
    displayDeckCounter,
    updateDeckCounter
}