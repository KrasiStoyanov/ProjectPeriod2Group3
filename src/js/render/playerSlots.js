'use strict';

import * as playerHelpers from '../player/helpers';
import { maxAmountOfPlayers, sidePlayerRectangle } from '../constants/player';


let slotCoordinates = [];
let rectangle
function create (game) {
	let playerSlot = game.add.group();
	let fontProps = {
        font: '24px Karla',
        fill: '#333',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
	};
	let rectangleModifier = 20;
	let backgroundRectangleX=0;
	let backgroundRectangleY=(game.height-((sidePlayerRectangle.height+rectangleModifier)+(2*sidePlayerRectangle.gutter)));
	let backgroundRectangleWidth=game.width;
	let bacakgrondrectangleHeight=game.height-(game.height-backgroundRectangleY);
	let backgroundRectangle= new Phaser.Graphics(game,0,0);
	backgroundRectangle.beginFill(0x000000);
	backgroundRectangle.drawRect(backgroundRectangleX, backgroundRectangleY, backgroundRectangleWidth, bacakgrondrectangleHeight);
	backgroundRectangle.endFill();
	playerSlot.add(backgroundRectangle);
	for (let index = 0; index < maxAmountOfPlayers; index += 1) {
		// TODO: create constants for world dimensions and the elements in the game

		let rectangleX = game.width/4+(((sidePlayerRectangle.width+rectangleModifier)+sidePlayerRectangle.gutter)*index);
		let rectangleY = game.height-((sidePlayerRectangle.height+rectangleModifier)+sidePlayerRectangle.gutter)
		let rectangleWidth=sidePlayerRectangle.width+rectangleModifier;
		let rectangleHeight=sidePlayerRectangle.height+rectangleModifier;
		let rectangle = new Phaser.Graphics(game, 0, 0);
		rectangle.beginFill(0xffffff);
		rectangle.drawRoundedRect( rectangleX, rectangleY,rectangleWidth ,rectangleHeight , 15 );
		rectangle.endFill();
		let text = new Phaser.Text(game, rectangleX+sidePlayerRectangle.gutter, rectangleY, index + 1, fontProps);

		rectangle.events.onInputDown.add(() => updateSelectedPlayer(currentPlayer), this);
		
		playerSlot.add(rectangle);
		playerSlot.add(text);

		game.world.addChild(playerSlot);

		slotCoordinates.push({
			x: (rectangleX) ,
			y: rectangleY,
			isEmpty: true
		});
	}
}

export {
	create,
	slotCoordinates
};