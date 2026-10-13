/**
 * Contains the TimeSlot class.
 *
 * @file src/TimeSlot.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

import { validateDate, validateValidDate } from './utils/validation.js'

/**
 * Represents a time slot with a start and end time.
 *
 * @class TimeSlot
 */
export class TimeSlot {
  /**
   * The start time of the time slot.
   */
  #startTime
  /**
   * The end time of the time slot.
   */
  #endTime

  /**
   * Creates a new TimeSlot instance with the specified start and end times.
   * Throws a TypeError if the start or end time is not a valid Date.
   * Throws an Error if the start time is not before the end time.
   *
   * @param {Date} startTime - The start time of the time slot.
   * @param {Date} endTime - The end time of the time slot.
   */
  constructor(startTime, endTime) {
    validateDate(startTime, 'startTime')
    validateDate(endTime, 'endTime')

    validateValidDate(startTime, 'startTime')
    validateValidDate(endTime, 'endTime')

    if (startTime >= endTime) {
      throw new Error('startTime must be before endTime')
    }

    this.#startTime = new Date(startTime.getTime())
    this.#endTime = new Date(endTime.getTime())
  }

  /**
   * Gets the start time of the time slot.
   *
   * @returns {Date} A new Date object representing the start time of the time slot.
   */
  getStartTime() {
    return new Date(this.#startTime.getTime())
  }

  /**
   * Gets the end time of the time slot.
   *
   * @returns {Date} A new Date object representing the end time of the time slot.
   */
  getEndTime() {
    return new Date(this.#endTime.getTime())
  }

  /**
   * Gets the duration of the time slot in minutes.
   *
   * @returns {number} The duration of the time slot in minutes.
   */
  getDurationInMinutes() {
    const durationInMilliseconds = this.#endTime - this.#startTime
    const millisecondsPerMinute = 1000 * 60

    return durationInMilliseconds / millisecondsPerMinute
  }

  /**
   * Checks if this time slot overlaps with another time slot.
   * Throws a TypeError if the argument is not a TimeSlot instance.
   *
   * @param {TimeSlot} otherTimeSlot - The other time slot to check for overlap.
   * @returns {boolean} True if the time slots overlap, false otherwise.
   */
  overlaps(otherTimeSlot) {
    if (!(otherTimeSlot instanceof TimeSlot)) {
      throw new TypeError('otherTimeSlot must be a TimeSlot')
    }

    return this.#startTime < otherTimeSlot.getEndTime() && this.#endTime > otherTimeSlot.getStartTime()
  }
}
