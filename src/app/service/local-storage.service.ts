
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    isSupported() {
		try {
			const key = "check-support";
			localStorage.setItem(key, key);
			localStorage.removeItem(key);
			return true;
		} catch (e) {
		  	return false;
		}
	}


	setItem = function (key, value) {
		if (!this.isSupported()) {
			return ;
		}

		localStorage.setItem(key, JSON.stringify(value));
	}
	getItem = function (key) {
		if (!this.isSupported()) {
			return ;
		}

		const value = localStorage.getItem(key);
		if (value) {
			try {
				var result = JSON.parse(value);
				if (typeof result == "string" && result != null) {
					result = JSON.parse(result);
				}

				return result;
			} catch (error) {
				return null;
			}
		}
	}
	deleteItem = function (key) {
		if (!this.isSupported()) {
			return ;
		}

		localStorage.removeItem(key);
	}
	clear = function () {
		if (!this.isSupported()) {
			return ;
		}
		localStorage.clear();
	}
}
