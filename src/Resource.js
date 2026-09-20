/**
 * Contains the Resource class.
 *
 * @file src/Resource.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

/**
 * Represents a resource that can be booked.
 */
export class Resource {
  /**
   * The unique identifier of the resource.
   */
  #id
  /**
   * The name of the resource.
   */
  #name

  /**
   * Creates a new Resource instance with the specified id and name.
   * Throws an error if the id or name is invalid.
   *
   * @param {string} id - The unique identifier of the resource.
   * @param {string} name - The name of the resource.
   */
  constructor(id, name) {
    if (typeof id !== 'string') {
      throw new TypeError('id must be a string')
    }

    if (typeof name !== 'string') {
      throw new TypeError('name must be a string')
    }

    if (id.trim() === '') {
      throw new Error('id must not be empty')
    }

    if (name.trim() === '') {
      throw new Error('name must not be empty')
    }

    this.#id = id
    this.#name = name
  }

  /**
   * Gets the unique identifier of the resource.
   *
   * @returns {string} The unique identifier of the resource.
   */
  getId() {
    return this.#id
  }

  /**
   * Gets the name of the resource.
   *
   * @returns {string} The name of the resource.
   */
  getName() {
    return this.#name
  }
}
