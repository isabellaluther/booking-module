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
   */
  constructor(id, resource, timeSlot) {
    this.#id = id
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
