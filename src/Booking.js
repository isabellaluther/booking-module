/**
 * Contains the Booking class.
 *
 * @file src/Booking.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

import { Resource } from './Resource.js'
import { TimeSlot } from './TimeSlot.js'

/**
 * Represents a booking of a resource during a time slot.
 */
export class Booking {
  /**
   * The unique identifier of the booking.
   */
  #id
  /**
   * The resource being booked.
   */
  #resource
  /**
   * The time slot of the booking.
   */
  #timeSlot

  /**
   * Creates a new Booking instance with the specified id, resource, and time slot.
   *
   * @param {string} id - The unique identifier of the booking.
   * @param {Resource} resource - The resource being booked.
   * @param {TimeSlot} timeSlot - The time slot of the booking.
   * @throws {TypeError} If the id is not a string.
   * @throws {Error} If the id is empty.
   * @throws {TypeError} If the resource is not a Resource.
   * @throws {TypeError} If the time slot is not a TimeSlot.
   */
  constructor(id, resource, timeSlot) {
    if (typeof id !== 'string') {
      throw new TypeError('id must be a string')
    }

    if (id.trim() === '') {
      throw new Error('id must not be empty')
    }

    if (!(resource instanceof Resource)) {
      throw new TypeError('resource must be a Resource')
    }

    if (!(timeSlot instanceof TimeSlot)) {
      throw new TypeError('timeSlot must be a TimeSlot')
    }

    this.#id = id.trim()
    this.#resource = resource
    this.#timeSlot = timeSlot
  }

  /**
   * Gets the unique identifier of the booking.
   *
   * @returns {string} The unique identifier of the booking.
   */
  getId() {
    return this.#id
  }

  /**
   * Gets the resource being booked.
   *
   * @returns {Resource} The resource being booked.
   */
  getResource() {
    return this.#resource
  }

  /**
   * Gets the time slot of the booking.
   *
   * @returns {TimeSlot} The time slot of the booking.
   */
  getTimeSlot() {
    return this.#timeSlot
  }
}
