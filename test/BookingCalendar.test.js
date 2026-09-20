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

/**
 * Tests for the BookingCalendar class.
 */
describe('BookingCalendar', () => {
  // Test that a newly created BookingCalendar should return an empty list when newly created.
  it('returns an empty booking list when created', () => {
    const calendar = new BookingCalendar()

    expect(calendar.getBookings()).toEqual([])
  })
})
