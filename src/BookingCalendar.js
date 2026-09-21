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
import { TimeSlot } from './TimeSlot.js'

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
   * @throws {TypeError} If the bookingId is not a string.
   */
  getBookingById(bookingId) {
    if (typeof bookingId !== 'string') {
      throw new TypeError('bookingId must be a string')
    }

    const trimmedBookingId = bookingId.trim()

    if (trimmedBookingId === '') {
      throw new Error('bookingId must not be empty')
    }

    return this.#bookings.find((booking) => booking.getId() === trimmedBookingId)
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
   * Gets all bookings for a specific date.
   *
   * @param {Date} date - The date to get bookings for.
   * @returns {Array<Booking>} The bookings for the specified date.
   * @throws {TypeError} If the date is not an instance of Date.
   * @throws {TypeError} If the date is an invalid Date.
   */
  getBookingsForDate(date) {
    if (!(date instanceof Date)) {
      throw new TypeError('date must be a Date')
    }

    if (Number.isNaN(date.getTime())) {
      throw new TypeError('date must be a valid Date')
    }

    const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    const startOfNextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    return this.#bookings.filter((booking) => {
      const bookingStartTime = booking.getTimeSlot().getStartTime()
      const bookingEndTime = booking.getTimeSlot().getEndTime()

      return bookingStartTime < startOfNextDate && bookingEndTime > startOfDate
    })
  }

  /**
   * Gets the available time slots for a specific resource within a given search time slot and duration.
   *
   * @param {Resource} resource - The resource to check availability for.
   * @param {TimeSlot} searchTimeSlot - The time slot to search within.
   * @param {number} durationInMinutes - The duration of the desired time slot in whole minutes.
   * @returns {Array<TimeSlot>} The available time slots for the specified resource and time slot.
   * @throws {TypeError} If the resource is not an instance of Resource.
   * @throws {TypeError} If the search time slot is not an instance of TimeSlot.
   * @throws {TypeError} If the duration is not a valid integer.
   * @throws {Error} If the duration is zero or negative.
   */
  getAvailableTimeSlots(resource, searchTimeSlot, durationInMinutes) {
    if (!(resource instanceof Resource)) {
      throw new TypeError('resource must be a Resource')
    }

    if (!(searchTimeSlot instanceof TimeSlot)) {
      throw new TypeError('searchTimeSlot must be a TimeSlot')
    }

    if (typeof durationInMinutes !== 'number') {
      throw new TypeError('durationInMinutes must be a number')
    }

    if (Number.isNaN(durationInMinutes)) {
      throw new TypeError('durationInMinutes must be a valid number')
    }

    if (!Number.isInteger(durationInMinutes)) {
      throw new TypeError('durationInMinutes must be an integer')
    }

    if (durationInMinutes <= 0) {
      throw new Error('durationInMinutes must be greater than zero')
    }

    const availableTimeSlots = []

    // Get all bookings for the resource that overlap with the search time slot and sort them by start time.
    const resourceBookings = this.getBookingsForResource(resource)
      .filter((booking) => booking.getTimeSlot().overlaps(searchTimeSlot))
      .sort(
        (firstBooking, secondBooking) =>
          firstBooking.getTimeSlot().getStartTime() - secondBooking.getTimeSlot().getStartTime()
      )

    let currentStartTime = searchTimeSlot.getStartTime()
    const searchEndTime = searchTimeSlot.getEndTime()
    const durationInMilliseconds = durationInMinutes * 60 * 1000

    // Iterate through each booking to find available time slots between bookings.
    for (const booking of resourceBookings) {
      const bookingStartTime = booking.getTimeSlot().getStartTime()
      const bookingEndTime = booking.getTimeSlot().getEndTime()

      // Check for available time slots before the current booking.
      while (currentStartTime.getTime() + durationInMilliseconds <= bookingStartTime.getTime()) {
        const currentEndTime = new Date(currentStartTime.getTime() + durationInMilliseconds)

        availableTimeSlots.push(new TimeSlot(currentStartTime, currentEndTime))

        currentStartTime = currentEndTime
      }

      if (bookingEndTime > currentStartTime) {
        currentStartTime = bookingEndTime
      }
    }

    // Add any remaining available time slots after the last booking.
    while (currentStartTime.getTime() + durationInMilliseconds <= searchEndTime.getTime()) {
      const currentEndTime = new Date(currentStartTime.getTime() + durationInMilliseconds)

      availableTimeSlots.push(new TimeSlot(currentStartTime, currentEndTime))

      currentStartTime = currentEndTime
    }

    return availableTimeSlots
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
   * @throws {TypeError} If the bookingId is not a string.
   * @throws {Error} If the booking id does not exist.
   */
  cancelBooking(bookingId) {
    if (typeof bookingId !== 'string') {
      throw new TypeError('bookingId must be a string')
    }

    const trimmedBookingId = bookingId.trim()

    const bookingIndex = this.#bookings.findIndex((booking) => booking.getId() === trimmedBookingId)

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
   * @throws {TypeError} If the booking is not an instance of Booking.
   */
  hasBookingConflict(booking) {
    if (!(booking instanceof Booking)) {
      throw new TypeError('booking must be a Booking')
    }

    return this.#bookings.some((existingBooking) => {
      const sameResource = existingBooking.getResource().getId() === booking.getResource().getId()

      const overlappingTime = existingBooking.getTimeSlot().overlaps(booking.getTimeSlot())

      return sameResource && overlappingTime
    })
  }
}
