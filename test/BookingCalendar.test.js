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

  // Test that adding a booking with an existing id throws an error.
  it('throws an error when booking id already exists', () => {
    const calendar = new BookingCalendar()
    const resource = new Resource('room-101', 'Study Room 101')

    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T12:00:00'), new Date('2026-09-20T13:00:00'))

    const firstBooking = new Booking('booking-1', resource, firstTimeSlot)

    const secondBooking = new Booking('booking-1', resource, secondTimeSlot)

    calendar.addBooking(firstBooking)

    expect(() => {
      calendar.addBooking(secondBooking)
    }).toThrow('booking id already exists')
  })

  // Test that adding a booking that overlaps with an existing booking for the same resource throws an error.
  it('throws an error when bookings overlap for the same resource', () => {
    const calendar = new BookingCalendar()
    const resource = new Resource('room-101', 'Study Room 101')

    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T10:30:00'), new Date('2026-09-20T11:30:00'))

    const firstBooking = new Booking('booking-1', resource, firstTimeSlot)

    const secondBooking = new Booking('booking-2', resource, secondTimeSlot)

    calendar.addBooking(firstBooking)

    expect(() => {
      calendar.addBooking(secondBooking)
    }).toThrow('booking conflicts with an existing booking')
  })

  // Test that overlapping time slots for different resources are allowed.
  it('allows overlapping time slots for different resources', () => {
    const calendar = new BookingCalendar()

    const firstResource = new Resource('room-101', 'Study Room 101')
    const secondResource = new Resource('room-102', 'Study Room 102')

    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T10:30:00'), new Date('2026-09-20T11:30:00'))

    const firstBooking = new Booking('booking-1', firstResource, firstTimeSlot)

    const secondBooking = new Booking('booking-2', secondResource, secondTimeSlot)

    calendar.addBooking(firstBooking)
    calendar.addBooking(secondBooking)

    expect(calendar.getBookings()).toEqual([firstBooking, secondBooking])
  })

  // Test that getting a booking by an id that does not exist returns undefined.
  it('returns a booking by id', () => {
    const calendar = new BookingCalendar()
    const resource = new Resource('room-101', 'Study Room 101')
    const timeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const booking = new Booking('booking-1', resource, timeSlot)

    calendar.addBooking(booking)

    expect(calendar.getBookingById('booking-1')).toBe(booking)
  })

  // Test that getting a booking by an id that does not exist returns undefined.
  it('returns undefined when booking id does not exist', () => {
    const calendar = new BookingCalendar()

    expect(calendar.getBookingById('booking-999')).toBeUndefined()
  })

  // Test that removing a booking by id works correctly.
  it('removes a booking by id', () => {
    const calendar = new BookingCalendar()
    const resource = new Resource('room-101', 'Study Room 101')
    const timeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const booking = new Booking('booking-1', resource, timeSlot)

    calendar.addBooking(booking)
    calendar.cancelBooking('booking-1')

    expect(calendar.getBookings()).toEqual([])
  })

  // Test that cancelling a booking that does not exist throws an error.
  it('throws an error when cancelling a booking that does not exist', () => {
    const calendar = new BookingCalendar()

    expect(() => {
      calendar.cancelBooking('booking-999')
    }).toThrow('booking id does not exist')
  })

  // Test that getting bookings for a specific resource works correctly.
  it('returns bookings for a specific resource', () => {
    const calendar = new BookingCalendar()

    const firstResource = new Resource('room-101', 'Study Room 101')
    const secondResource = new Resource('room-102', 'Study Room 102')

    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T12:00:00'), new Date('2026-09-20T13:00:00'))

    const firstBooking = new Booking('booking-1', firstResource, firstTimeSlot)

    const secondBooking = new Booking('booking-2', secondResource, secondTimeSlot)

    calendar.addBooking(firstBooking)
    calendar.addBooking(secondBooking)

    expect(calendar.getBookingsForResource(firstResource)).toEqual([firstBooking])
  })

  // Test that getting bookings for a non-Resource throws an error.
  it('throws an error when resource is not a Resource', () => {
    const calendar = new BookingCalendar()

    expect(() => {
      calendar.getBookingsForResource('not a resource')
    }).toThrow('resource must be a Resource')
  })

  // Test that getting bookings for a resource with no bookings returns an empty array.
  it('returns an empty array when resource has no bookings', () => {
    const calendar = new BookingCalendar()
    const resource = new Resource('room-101', 'Study Room 101')

    expect(calendar.getBookingsForResource(resource)).toEqual([])
  })

  // Test that getting bookings for a specific date works correctly.
  it('returns bookings for a specific date', () => {
    const calendar = new BookingCalendar()
    const resource = new Resource('room-101', 'Study Room 101')

    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-21T10:00:00'), new Date('2026-09-21T11:00:00'))

    const firstBooking = new Booking('booking-1', resource, firstTimeSlot)

    const secondBooking = new Booking('booking-2', resource, secondTimeSlot)

    calendar.addBooking(firstBooking)
    calendar.addBooking(secondBooking)

    expect(calendar.getBookingsForDate(new Date('2026-09-20'))).toEqual([firstBooking])
  })

  // Test that getting bookings for a non-Date throws an error.
  it('throws an error when date is not a Date', () => {
    const calendar = new BookingCalendar()

    expect(() => {
      calendar.getBookingsForDate('2026-09-20')
    }).toThrow('date must be a Date')
  })

  // Test that getting bookings for an invalid Date throws an error.
  it('throws an error when date is an invalid Date', () => {
    const calendar = new BookingCalendar()

    expect(() => {
      calendar.getBookingsForDate(new Date('invalid'))
    }).toThrow('date must be a valid Date')
  })

  // Test that getting bookings for a date with no bookings returns an empty array.
  it('returns an empty array when there are no bookings for the date', () => {
    const calendar = new BookingCalendar()

    expect(calendar.getBookingsForDate(new Date('2026-09-20'))).toEqual([])
  })

  // Test that getting available time slots works correctly when there are no bookings.
  it('returns available time slots when there are no bookings', () => {
    const calendar = new BookingCalendar()
    const resource = new Resource('room-101', 'Study Room 101')

    const searchTimeSlot = new TimeSlot(new Date('2026-09-20T09:00:00'), new Date('2026-09-20T12:00:00'))

    const availableTimeSlots = calendar.getAvailableTimeSlots(resource, searchTimeSlot, 60)

    expect(availableTimeSlots.length).toBe(3)

    expect(availableTimeSlots[0].getStartTime()).toEqual(new Date('2026-09-20T09:00:00'))

    expect(availableTimeSlots[0].getEndTime()).toEqual(new Date('2026-09-20T10:00:00'))

    expect(availableTimeSlots[2].getStartTime()).toEqual(new Date('2026-09-20T11:00:00'))

    expect(availableTimeSlots[2].getEndTime()).toEqual(new Date('2026-09-20T12:00:00'))
  })
})
