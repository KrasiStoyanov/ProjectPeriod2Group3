'use strict';

import * as playerHelpers from '../player/helpers';
import { maxAmountOfPlayers, sidePlayerRectangle } from '../constants/player';
import * as playerSlotConstants from '../constants/playerSlots';


let slotCoordinates = [];
let rectangle;
let playerSlots;

let rectangleParameters =[];
let rectangleModifier = 20;
let rectangleWidth = sidePlayerRectangle.width + rectangleModifier;
let rectangleHeight = sidePlayerRectangle.height + rectangleModifier;
let backgrondRectangleHeight
function create (game) {
	
	let backgroundRectangleX=0;
	let backgroundRectangleY=(game.height-((sidePlayerRectangle.height+rectangleModifier)+(2*sidePlayerRectangle.gutter)));
	let backgroundRectangleWidth=game.width;
	let backgrondRectangleHeight=game.height-(game.height-backgroundRectangleY);
	let backgroundRectangle= game.add.graphics(0,0);
	backgroundRectangle.beginFill(0x333333);
	backgroundRectangle.drawRect(backgroundRectangleX, backgroundRectangleY, backgroundRectangleWidth, backgrondRectangleHeight);
	backgroundRectangle.endFill();
	playerSlots = game.add.group();
	let fontProps = {
        font: '24px Karla',
        fill: '#333',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
	};
	for (let index = 0; index < maxAmountOfPlayers; index += 1) {
		// TODO: create constants for world dimensions and the elements in the game
		let playerSlot = game.add.group();
		
		let playerSlotX = (game.width - (5 * playerSlotConstants.size.width)) / 2 + (playerSlotConstants.size.width * index) + 10 * index;
		let playerSlotY = backgroundRectangleY + 10;

		playerSlot.x = playerSlotX;
		playerSlot.y = playerSlotY;
		
		let rectangle = new Phaser.Graphics(game, 0, 0);
		rectangle.beginFill(0xffffff);
		rectangle.drawRoundedRect( 0, 0,playerSlotConstants.size.width ,playerSlotConstants.size.height , 15 );
		rectangle.endFill();
		let text = new Phaser.Text(game, sidePlayerRectangle.gutter, 0, index + 1, fontProps);
		rectangle.events.onInputDown.add(() => updateSelectedPlayer(currentPlayer), this);
		
		playerSlot.add(rectangle);
		playerSlot.add(text);

		slotCoordinates.push({
			x: playerSlotX ,
			y: playerSlotY,
			isEmpty: true
		});
		rectangleParameters.push({
			width: rectangleWidth,
			height: rectangleHeight
		})
		playerSlots.add(playerSlot);
	}
}

function getPlayerSlots () {
	return playerSlots;
}

export {
	create,
	slotCoordinates,
	rectangleParameters,
	getPlayerSlots
	
};