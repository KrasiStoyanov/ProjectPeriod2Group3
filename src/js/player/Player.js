'use strict';

let id = 0;
export default class Player {
	constructor(name) {
		this._id = id++;
	}

	get id() {
		return this._id;
	}
}