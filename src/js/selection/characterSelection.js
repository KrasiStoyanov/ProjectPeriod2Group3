'use strict';

import * as CharacterDeck from '../decks/characterDeck';
import * as playerHelpers from '../player/helpers';
import * as playerValidator from '../validators/playerValidator';
import { slotCoordinates } from '../render/playerSlots';

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
    	let gutter = 50;

        let characterCard = game.add.sprite((198 * index) + (gutter * (index + 1)), 50, `characterCard${index + 1}`);

        characterCard.scale.setTo(1, 1);
        characterCard.variable = currentCard;

        characterCard.inputEnabled = true;
        characterCard.input.enableDrag(true);
        characterCard.events.onDragStop.add(onCharacterDragStop, this);
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
function onCharacterDragStop (sprite, pointer) {
    let droppedAt = {
        x: sprite.position.x,
        y: sprite.position.y
    };

    for (let index = 0; index < slotCoordinates.length; index += 1) {
        let currentSlot = slotCoordinates[index];
        if (currentSlot.isEmpty) {
            if (droppedAt.x <= currentSlot.x + 100 && 
                droppedAt.x >= currentSlot.x - 100) {
                if (droppedAt.y <= currentSlot.y + 100 &&
                    droppedAt.y >= currentSlot.y - 100) {
                    sprite.position.x = currentSlot.x;
                    sprite.position.y = currentSlot.y;

                    let characterCard = sprite.variable;
                    let player = playerHelpers.addPlayer(characterCard);

                    slotCoordinates[index].isEmpty = false;
                }
            }
        }
    }
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