'use strict';

import Card from './Card';
import * as characterCardValidator from '../validators/characterCardValidator';

export default class CharacterCard extends Card {
	constructor(name, description, image, traits) {
		super('character', traits);
		this.name = name;
		this.description = description;
		this.image = image;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		characterCardValidator.validateName(value);

		this._name = value;
	}

	get description() {
		return this._description;
	}

	set description(value) {
		characterCardValidator.validateDescription(value);

		this._description = value;
	}

	get image() {
		return this._image;
	}

	set image(value) {
		characterCardValidator.validateImage(value);

		this._image = value;
	}
}