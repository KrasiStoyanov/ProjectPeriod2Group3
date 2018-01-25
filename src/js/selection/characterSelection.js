'use strict';

import * as CharacterDeck from '../decks/characterDeck';
import * as playerHelpers from '../player/helpers';
import * as playerValidator from '../validators/playerValidator';
import { slotCoordinates, rectangleParameters, backgrondRectangleHeight } from '../render/playerSlots';
import {sidePlayerImageSize, sidePlayerRectangle } from '../constants/player';
import ChallengeCard from '../card-types/ChallengeCard';
import {changeCardSize,} from '../selection/playerInteraction';
import {minAmountOfPlayers} from '../constants/player'
 


let game;
let spritePosition;
let spriteScale
let players
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
const characterCardImagesBack = [
    "./src/images/character-1-back.png",
    "./src/images/character-2-back.png",
    "./src/images/character-3-back.png",
    "./src/images/character-4-back.png",
    "./src/images/character-5-back.png",
    "./src/images/character-6-back.png",
    "./src/images/character-7-back.png",
    "./src/images/character-8-back.png"
];
/**
 * @function
 * @name characterSelection
 * @param { object } game - The game object.
 * @description Rendering and manipulating the character selection function.
 */
function characterSelection (gameObject) {
    game = gameObject ? gameObject : game;
    let characterDeck = CharacterDeck.getDeck();
    let characterDeckLength = characterCardImages.length;
    for (var index = 0; index < characterDeckLength; index += 1) {
    	let currentCard = characterDeck[index];
    	let gutter = 50;
        let characterCardY=50;
        let characterCard;
        
        if (index< characterDeckLength/2){
            characterCard = game.add.sprite((198 * index) + (gutter * (index + 1)), characterCardY, `characterCard${index + 1}`);
      
        }
        else{
            characterCard = game.add.sprite(198 * (index-(characterDeckLength/2)-1) + (gutter * (index + 1)), (game.world.height/3)+100, `characterCard${index + 1}`);
        }
       
        characterCard.scale.setTo((game.world.height/3)/characterCard.height);
        characterCard.variable = currentCard;
        spriteScale=(game.world.height/3)/characterCard.height
        let characterCardGroup = game.add.group();
        characterCardGroup.add(characterCard);
        characterCardGroup.x =game.world.centerX-(characterCard.width+gutter)*2
        characterCard.inputEnabled = true;


        characterCard.input.enableDrag(true);
        characterCard.events.onDragUpdate.add(onCharacterDragUpdate, this);
        characterCard.events.onDragStop.add(onCharacterDragStop, this);
        game.world.add(characterCardGroup)
    }
    
   
    
    let fontProps = {
        font: '64px Karla',
        fill: '#fff',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    };

    

    
}

/**
 * @function
 * @name onCharacterDragUpdate
 * @param {*} sprite 
 * @param {*} pointer 
 * @description  resizes and scales sprites that are being draged
 */
function onCharacterDragUpdate (sprite, pointer){
    
    let dragAndDropBoundries ={
        top: game.world.height-(game.world.height/3),
		right: game.world.width ,
		bottom: game.world.height,
		left: 0
    };
    spritePosition = sprite.worldPosition.y;
    sprite.bringToTop();
    sprite.scale.setTo(spriteScale);
	
	
    let shouldSmaller = isOverSlots(dragAndDropBoundries, 0);
    resizeCard(sprite, shouldSmaller);
   
		
    
}
/**
 * @function 
 * @name resizeCard
 * @param {*} sprite 
 * @param {*} shouldSmaller 
 * @description a modified changeCardSize function, scales down sprites passed through this function
 */
function resizeCard (sprite, shouldSmaller) {
    const initialScale =((game.world.height/3)/sprite.height);
    if (shouldSmaller) {
        sprite.scale.setTo(initialScale*0.65);
    } else {
        sprite.scale.setTo(initialScale);
    }
    return;
}
/**
 * @function
 * @name isOverSlots
 * @param {*} boundries 
 * @param {*} offset 
 * @description a striped down version of the function isOverElement, checks if the card is over the area of the player slots
 */
function isOverSlots (boundries, offset) {
    let isInTopBoundriesOfSlots = {
        min: spritePosition <= boundries.bottom + offset,
        max: spritePosition >= boundries.top - offset
    };

    if (isInTopBoundriesOfSlots.min && isInTopBoundriesOfSlots.max) {
       			
            return true;
        } else {			
            return false;
    }
}

/**
 * @function
 * @name onCharacterDragStop
 * @description checks if the card is over a slot, if it is, it adds it to selected characters
 */

function onCharacterDragStop (sprite, pointer) {
    let droppedAt = {
        x: sprite.position.x,
        y: sprite.position.y
    };

    for (let index = 0; index < slotCoordinates.length; index += 1) {
        let currentSlot = slotCoordinates[index];
        
        if (currentSlot.isEmpty) {
            if (droppedAt.x <= currentSlot.x-(game.world.width*0.173) + rectangleParameters[0].width && 
                droppedAt.x >= currentSlot.x-(game.world.width*0.173) - rectangleParameters[0].width) {
                if (droppedAt.y <= currentSlot.y + 100 &&
                    droppedAt.y >= currentSlot.y - 100) {
                     sprite.position.x = currentSlot.x;
                     sprite.position.y = currentSlot.y;
                    
                    let portraitMarginLeft = ((rectangleParameters[0].width)/2);
                    let portraitMarginTop = ((rectangleParameters[0].height)/2)
                    
                    let portraitPositionX = currentSlot.x + portraitMarginLeft;
                    let portraitPositionY = currentSlot.y + portraitMarginTop;
                    sprite.destroy();
                    

                    let characterCard = sprite.variable;
                    let player = playerHelpers.addPlayer(characterCard);
                    let characterIcon = game.add.sprite(portraitPositionX, portraitPositionY, player.name);
                    characterIcon.anchor.x = 0.5;
                    characterIcon.anchor.y = 0.5;
                    let portraitScale = (rectangleParameters[0].height*0.72)/characterIcon.height;
                    // 0.72 is the ratio used with the side player render
                    characterIcon.scale.setTo(portraitScale);
                   
                    
                    slotCoordinates[index].isEmpty = false;
                    players = playerHelpers.getPlayers();
                    if (players.length >= minAmountOfPlayers){
                        renderPlayButton();
                        }

                        break;
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
    players = playerHelpers.getPlayers();
    playerValidator.validateNumberOfPlayersSelected(players);
    
    button.game.state.start('mainScreen');
}
/**
 * @function 
 * @name renderPlayButton
 * @description renders a play button
 */
function renderPlayButton(){
    let playButtonX= game.world.width-game.world.width/20;
    let playButtonY= game.world.height - 79;
    // 79 is half of the backroundRectangleHeight
    let playButton = game.add.button(playButtonX, playButtonY, 'playButton');
    playButton.inputEnabled = true;
    playButton.events.onInputDown.add(onPlaySelect, this);
    playButton.anchor.x = 1;
    playButton.anchor.y = 0.5;
}

export default characterSelection;