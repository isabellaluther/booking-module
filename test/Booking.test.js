/**
 * Contains tests for the Booking class.
 *
 * @file test/Booking.test.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

import { describe, expect, it } from 'vitest'
import { Booking } from '../src/Booking.js'
import { Resource } from '../src/Resource.js'
import { TimeSlot } from '../src/TimeSlot.js'

/**
 * Tests for the Booking class.
 */
describe('Booking', () => {
  // Test that the Booking class correctly returns the id, resource, and time slot.
  it('returns the id, resource and time slot', () => {
    const resource = new Resource('room-101', 'Study Room 101')
    const timeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const booking = new Booking('booking-1', resource, timeSlot)

    expect(booking.getId()).toBe('booking-1')
    expect(booking.getResource()).toBe(resource)
    expect(booking.getTimeSlot()).toBe(timeSlot)
  })
})
