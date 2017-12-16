'use strict';

import * as CharacterDeck from '../decks/characterDeck';
import * as playerHelpers from '../player/helpers';
import * as playerValidator from '../validators/playerValidator';

// Using this for now
const characterCardImages = [
    "./src/images/character-1.png",
    "./src/images/character-2.png",
    "./src/images/character-3.png",
    "./src/images/character-4.png",
    "./src/images/character-5.png",
    "./src/images/character-6.png",
    "./src/images/character-7.png",
    "./src/images/character-8.png"
];

/**
 * @function
 * @name characterSelection
 * @param { object } game - The fame object.
 * @description Rendering and manipulating the character selection function.
 */
function characterSelection (game) {
    let characterDeck = CharacterDeck.getDeck();
    let characterDeckLength = characterCardImages.length;
    for (var index = 0; index < characterDeckLength; index += 1) {
    	let currentCard = characterDeck[index];
    	let gutter = 30;
    
        let characterButton;
        if (index === 0) {
            characterButton = game.add.button(50, 50, `characterButton${index + 1}`);
        } else {
            characterButton = game.add.button(50 + (198 * index) + (gutter * index), 50, `characterButton${index + 1}`);
        }

        characterButton.scale.setTo(1, 1);
        characterButton.inputEnabled = true;
        characterButton.variable = currentCard;
        characterButton.events.onInputDown.add(onCharacterSelect, this);
    }

    let playButton = game.add.button('100%' - 50, '100%' - 50, 'button');
    playButton.width = 75;
    playButton.height = 75;
    playButton.inputEnabled = true;
    playButton.events.onInputDown.add(onPlaySelect, this);

    let fontProps = {
        font: '64px Karla',
        fill: '#fff',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    };

    let playButtonLabel = game.add.text(50, 75, 'PLAY', fontProps);
    playButtonLabel.setTextBounds(0, 0, playButtonLabel.width, playButtonLabel.height);

    playButton.addChild(playButtonLabel);
}

/**
 * @function
 * @name onCharacterSelect
 * @param { object } button - The button which is being clicked.
 * @description Create new instance of the class Player on button click.
 */
function onCharacterSelect (button) {
    let characterCard = button.variable;
    let player = playerHelpers.addPlayer(characterCard);
}

/**
 * @function
 * @name onCharacterSelect
 * @param { object } button - The button which is being clicked.
 * @description Perform validations and proceed to the main playing screen.
 */
function onPlaySelect (button) {
    let players = playerHelpers.getPlayers();
    playerValidator.validateNumberOfPlayersSelected(players);
    
    button.game.state.start('mainScreen');
}

export default characterSelection;