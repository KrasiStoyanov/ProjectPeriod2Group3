'use strict';

import characterCardsList from '../data/characterCardsList';
import CharacterCard from '../card-types/CharacterCard';
import * as helpers from './helpers';

let characterDeck = [];
for (let index = 0; index < characterCardsList.length; index += 1) {
	let name = characterCardsList[index].name;
	let description = characterCardsList[index].description;
	let image = characterCardsList[index].image;
	let traits = characterCardsList[index].traits;

	let currentCard = new CharacterCard(name, description, image, traits);

	characterDeck.push(currentCard);
}

function getDeck () {
	return characterDeck;
}

function getCard (id) {
	let card = helpers.getCard(characterDeck, id);

	return card;
}

export {
	getDeck,
	getCard
};