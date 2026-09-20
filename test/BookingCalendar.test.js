/**
 * Contains tests for the BookingCalendar class.
 *
 * @file test/BookingCalendar.test.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

import { describe, expect, it } from 'vitest'
import { BookingCalendar } from '../src/BookingCalendar.js'
import { Booking } from '../src/Booking.js'
import { Resource } from '../src/Resource.js'
import { TimeSlot } from '../src/TimeSlot.js'

/**
 * Tests for the BookingCalendar class.
 */
describe('BookingCalendar', () => {
  // Test that a newly created BookingCalendar should return an empty list when newly created.
  it('returns an empty booking list when created', () => {
    const calendar = new BookingCalendar()

    expect(calendar.getBookings()).toEqual([])
  })

  // Test that a booking can be added to the calendar.
  it('adds a booking to the calendar', () => {
    const calendar = new BookingCalendar()
    const resource = new Resource('room-101', 'Study Room 101')
    const timeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const booking = new Booking('booking-1', resource, timeSlot)

    calendar.addBooking(booking)

    expect(calendar.getBookings()).toEqual([booking])
  })

  // Test that adding something that is not a Booking throws an error.
  it('throws an error when adding something that is not a Booking', () => {
    const calendar = new BookingCalendar()

    expect(() => {
      calendar.addBooking('not a booking')
    }).toThrow('booking must be a Booking')
  })
})
