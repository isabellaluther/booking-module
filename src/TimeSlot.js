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
   * 
   * @param {TimeSlot} otherTimeSlot - The other time slot to check for overlap.
   * @returns {boolean} True if the time slots overlap, false otherwise.
   */
  overlaps(otherTimeSlot) {
    return (
        this.#startTime < otherTimeSlot.getEndTime() &&
        this.#endTime > otherTimeSlot.getStartTime()
    )
  }
}