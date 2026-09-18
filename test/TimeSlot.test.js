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
})