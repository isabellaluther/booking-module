/**
 * Contains the TimeSlot class.
 * 
 * @file src/TimeSlot.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

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
   * Throws a RangeError if the start time is not before the end time.
   * 
   * @param {Date} startTime - The start time of the time slot.
   * @param {Date} endTime - The end time of the time slot.
   */
    constructor(startTime, endTime) {
    if (startTime >= endTime) {
        throw new Error('startTime must be before endTime')
    }

    this.#startTime = startTime
    this.#endTime = endTime
    }

  /**
   * Gets the start time of the time slot.
   *
   * @returns {Date} The start time of the time slot.
   */
  getStartTime() {
    return this.#startTime
  }

  /**
   * Gets the end time of the time slot.
   *
   * @returns {Date} The end time of the time slot.
   */
  getEndTime() {
    return this.#endTime
  }
}