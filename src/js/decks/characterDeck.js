'use strict';

import characterCardsList from '../data/characterCardsList';
import CharacterCard from '../card-types/CharacterCard';

let characterDeck = [];
for (let index = 0; index < characterCardsList.length; index += 1) {
	let challenge = characterCardsList[index].challenge;
	let stage = characterCardsList[index].stage;
	let traits = characterCardsList[index].traits;

	let currentCard = new CharacterCard(challenge, stage, traits);

	characterDeck.push(currentCard);
}

export default characterDeck;