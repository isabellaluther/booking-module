/**
 * Contains tests for the TimeSlot class.
 *
 * @file test/TimeSlot.test.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

import { describe, expect, it } from 'vitest'
import { TimeSlot } from '../src/TimeSlot.js'

/**
 * Tests for the TimeSlot class.
 */
describe('TimeSlot', () => {
  // Test that the start and end times are returned correctly
  it('returns the start and end time', () => {
    const startTime = new Date('2026-09-20T10:00:00')
    const endTime = new Date('2026-09-20T11:00:00')

    const timeSlot = new TimeSlot(startTime, endTime)

    expect(timeSlot.getStartTime()).toBe(startTime)
    expect(timeSlot.getEndTime()).toBe(endTime)
  })

  // Test that an error is thrown when the start time is after the end time
  it('throws an error when start time is after end time', () => {
    const startTime = new Date('2026-09-20T12:00:00')
    const endTime = new Date('2026-09-20T10:00:00')

    expect(() => {
      new TimeSlot(startTime, endTime)
    }).toThrow()
  })

  // Test that the duration in minutes is calculated correctly
  it('returns the duration in minutes', () => {
    const startTime = new Date('2026-09-20T10:00:00')
    const endTime = new Date('2026-09-20T11:30:00')

    const timeSlot = new TimeSlot(startTime, endTime)

    expect(timeSlot.getDurationInMinutes()).toBe(90)
  })

  // Test that the overlaps method returns true when time slots overlap
  it('returns true when time slots overlap', () => {
    const firstTimeSlot = new TimeSlot(
        new Date('2026-09-20T10:00:00'),
        new Date('2026-09-20T11:00:00')
    )

    const secondTimeSlot = new TimeSlot(
        new Date('2026-09-20T10:30:00'),
        new Date('2026-09-20T11:30:00')
    )

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(true)
  })
})