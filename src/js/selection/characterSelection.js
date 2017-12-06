'use strict';

import * as CharacterDeck from '../decks/characterDeck';
import * as playerHelpers from '../player/helpers';

function characterSelection (game) {
    let characterDeck = CharacterDeck.getDeck();
    let characterDeckLength = characterDeck.length;
    for (var index = 0; index < characterDeckLength; index += 1) {
    	let currentCard = characterDeck[index];
    	let gutter = 30;

    	let characterButton = game.add.button(75 * (index + 1) + (index + 1) * gutter, 50, 'button');
        characterButton.width = 75;
        characterButton.height = 75;
        characterButton.inputEnabled = true;
        characterButton.variable = currentCard;
        characterButton.events.onInputDown.add(onCharacterSelect, this);

    	let fontProps = {
    		font: '64px Karla',
    		fill: '#fff',
    		boundsAlignH: 'center',
    		boundsAlignV: 'middle'
    	};

    	let characterName = game.add.text(75, 75, currentCard.name, fontProps);
    	characterName.setTextBounds(0, 0, characterButton.width, characterButton.height);

    	characterButton.addChild(characterName);
    }
}

function onCharacterSelect (button) {
    let characterCard = button.variable;
    playerHelpers.addPlayer(characterCard);
    
    let players = playerHelpers.getPlayers();
    console.log(players);
}

export default characterSelection;