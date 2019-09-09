const stg_prefix: string = 'tl_aa';
const encrypt_key : string = 'TxjWvYFr8x';

declare var require: any;

export class Storage {

  static CryptoJS = require('crypto-js');

	/**
	 * Removes the value from local storage by its key
	 * @param {string} key
	 */
  static remove(key: string) { localStorage.removeItem(`${stg_prefix}_${key.toLowerCase()}`) }

	/**
	 * Removes data from local storage by its key
   * NOTE: this will return a string, if the local storage value is an
   * object the getObject() method should be use insted
	 * @param {string} key
	 * @return {string}
	 */
  static getOne(key: string): string {
    return this.decrypt(localStorage.getItem(`${stg_prefix}_${key.toLowerCase()}`));
  }

	/**
	 * Returns an object stored as a string in local storage
	 * @param {string} key
	 * @return {Object}
	 */
  static getObject(key: string): Object {
    let info = localStorage.getItem(`${stg_prefix}_${key.toLowerCase()}`);
    if (info) {
      let data = this.decrypt(info);
      try {
        return (data && typeof data === 'string') ? JSON.parse(data) : data;
      } catch {
        return data;
      }
    } else {
      return {};
    }
  }

	/**
	 * Stores a string in local storage
	 * @param {string}	key
	 * @param {string}	value
	 */
  static setOne(key: string, value: string) {
    return localStorage.setItem(`${stg_prefix}_${key.toLowerCase()}`, this.encrypt(value));
  }

	/**
	 * Stores an object in local storage
	 * @param {string}	key
	 * @param {any}		value
	 */
  static setObject(key: string, value: any): void {
    let data = this.encrypt(JSON.stringify(value));
    localStorage.setItem(`${stg_prefix}_${key.toLowerCase()}`, data);
  }

	/**
	 * Clears the local storage
	 */
  static clear(): void { localStorage.clear(); }

	/**
	 * Checks if the key is set in the local storage.
	 * @param {boolean} key
   * @return {boolean}
	 */
  static check(key: string): boolean {
    let data = localStorage.getItem(`${stg_prefix}_${key.toLowerCase()}`);
    return data !== null;
  }

	/**
	 * Encrypt the data befores store
	 * @param {string} data
	 */
  private static encrypt(data: string) {
    return this.CryptoJS.AES.encrypt(data, encrypt_key);
  }

	/**
	 * Decrypt the stored data
	 * @param {string} data
	 */
  static decrypt(data: string) {
    let result = '';
    if (data) {
      try {
        let crypt = this.CryptoJS.AES.decrypt(data, encrypt_key);
        result = crypt.toString(this.CryptoJS.enc.Utf8);
        return result;
      } catch {
        return null;
      }
    }
    return null;
  }

}
