/**
 * Contains the BookingCalendar class.
 *
 * @file src/BookingCalendar.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

/**
 * Manages bookings in a booking calendar.
 */
export class BookingCalendar {
  /**
   * The list of bookings in the calendar.
   */
  #bookings

  /**
   * Creates a new BookingCalendar instance
   * with an empty list of bookings.
   */
  constructor() {
    this.#bookings = []
  }

  /**
   * Gets all bookings in the calendar.
   *
   * @returns {Array} A copy of the bookings in the calendar.
   */
  getBookings() {
    return [...this.#bookings]
  }
}
