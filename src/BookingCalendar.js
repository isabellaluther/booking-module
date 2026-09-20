/**
 * Contains the BookingCalendar class.
 *
 * @file src/BookingCalendar.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

import { Booking } from './Booking.js'
import { Resource } from './Resource.js'

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
   * Gets a booking by its id.
   *
   * @param {string} bookingId - The id of the booking to retrieve.
   * @returns {Booking|undefined} The booking with the given id, or undefined if not found.
   */
  getBookingById(bookingId) {
    return this.#bookings.find((booking) => booking.getId() === bookingId)
  }

  /**
   * Gets all bookings for a specific resource.
   *
   * @param {Resource} resource - The resource to get bookings for.
   * @returns {Array<Booking>} The bookings for the specified resource.
   * @throws {TypeError} If the resource is not an instance of Resource.
   */
  getBookingsForResource(resource) {
    if (!(resource instanceof Resource)) {
      throw new TypeError('resource must be a Resource')
    }

    return this.#bookings.filter((booking) => booking.getResource().getId() === resource.getId())
  }

  /**
   * Adds a booking to the calendar.
   *
   * @param {Booking} booking - The booking to add.
   * @throws {TypeError} If the booking is not an instance of Booking.
   * @throws {Error} If the booking id already exists.
   * @throws {Error} If the booking conflicts with an existing booking.
   */
  addBooking(booking) {
    if (!(booking instanceof Booking)) {
      throw new TypeError('booking must be a Booking')
    }

    const bookingIdAlreadyExists = this.#bookings.some((existingBooking) => existingBooking.getId() === booking.getId())

    if (bookingIdAlreadyExists) {
      throw new Error('booking id already exists')
    }

    if (this.hasBookingConflict(booking)) {
      throw new Error('booking conflicts with an existing booking')
    }

    this.#bookings.push(booking)
  }

  /**
   * Cancels a booking by its id.
   *
   * @param {string} bookingId - The id of the booking to cancel.
   * @throws {Error} If the booking id does not exist.
   */
  cancelBooking(bookingId) {
    const bookingIndex = this.#bookings.findIndex((booking) => booking.getId() === bookingId)

    if (bookingIndex === -1) {
      throw new Error('booking id does not exist')
    }

    this.#bookings.splice(bookingIndex, 1)
  }

  /**
   * Checks if the given booking conflicts with any existing bookings in the calendar.
   *
   * @param {Booking} booking - The booking to check for conflicts.
   * @returns {boolean} True if there is a conflict, false otherwise.
   */
  hasBookingConflict(booking) {
    return this.#bookings.some((existingBooking) => {
      const sameResource = existingBooking.getResource().getId() === booking.getResource().getId()

      const overlappingTime = existingBooking.getTimeSlot().overlaps(booking.getTimeSlot())

      return sameResource && overlappingTime
    })
  }
}
