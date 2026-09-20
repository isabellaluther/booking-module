/**
 * Contains the BookingCalendar class.
 *
 * @file src/BookingCalendar.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

import { Booking } from './Booking.js'

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
   * @returns {Array<Booking>} A copy of the bookings in the calendar.
   */
  getBookings() {
    return [...this.#bookings]
  }

  /**
   * Adds a booking to the calendar.
   *
   * @param {Booking} booking - The booking to add.
   * @throws {TypeError} If the booking is not an instance of Booking.
   */
  addBooking(booking) {
    if (!(booking instanceof Booking)) {
      throw new TypeError('booking must be a Booking')
    }

    const bookingIdAlreadyExists = this.#bookings.some((existingBooking) => existingBooking.getId() === booking.getId())

    if (bookingIdAlreadyExists) {
      throw new Error('booking id already exists')
    }

    this.#bookings.push(booking)
  }
}
