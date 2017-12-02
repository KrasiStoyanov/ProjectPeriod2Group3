'use strict';

import Card from './Card';

export default class CharacterCard extends Card {
	constructor(name, description, image, traits) {
		super('character', traits);
		this.name = name;
		this.description = description;
		this.image = image;
	}
}