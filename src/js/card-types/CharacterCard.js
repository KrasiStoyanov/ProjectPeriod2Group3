'use strict';

import Card from './Card';
import * as characterCardValidator from '../validators/characterCardValidator';

let id = 0;

/**
 * Class representing a character card.
 * @extends Card
 */
export default class CharacterCard extends Card {
	/**
     * Create a character card.
     * @param { string } name - The name of the character.
     * @param { string } description - The short bio of the character.
     * @param { string } image - Path to the image of the character.
     * @param { array } traits - The traits of the character.
     */
	constructor(name, description, image, traits) {
		super('character', traits);
		this._id = id++;
		this.name = name;
		this.description = description;
		this.image = image;
	}

	/**
     * Get the id of the card.
     * @return { number } The id of the card.
     */
	get id() {
		return this._id;
	}

	/**
     * Get the name of the character.
     * @return { string } The name of the character.
     */
	get name() {
		return this._name;
	}

	/** Set the name of the character. */
	set name(value) {
		characterCardValidator.validateName(value);

		this._name = value;
	}

	/**
     * Get the short bio of the character.
     * @return { string } The short bio of the character.
     */
	get description() {
		return this._description;
	}

	/** Set the short bio of the character. */
	set description(value) {
		characterCardValidator.validateDescription(value);

		this._description = value;
	}

	/**
     * Get the path to the character's image.
     * @return { string } The path to the character's image.
     */
	get image() {
		return this._image;
	}

	/** Set the path to the character's image. */
	set image(value) {
		characterCardValidator.validateImage(value);

		this._image = value;
	}
}