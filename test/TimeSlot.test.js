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

    expect(timeSlot.getStartTime()).toEqual(startTime)
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
    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T10:30:00'), new Date('2026-09-20T11:30:00'))

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(true)
  })

  // Test that the overlaps method returns true when time slots partially overlap
  it('returns true when time slots partially overlap', () => {
    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T10:30:00'), new Date('2026-09-20T11:30:00'))

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(true)
  })

  // Test that the overlaps method returns true when the first time slot is completely inside the second time slot
  it('returns true when the first time slot is inside the second', () => {
    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:30:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T12:00:00'))

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(true)
  })

  // Test that the overlaps method returns true when the second time slot is completely inside the first time slot
  it('returns true when the second time slot is inside the first', () => {
    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T12:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T10:30:00'), new Date('2026-09-20T11:00:00'))

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(true)
  })

  // Test that the overlaps method returns true when time slots have the same start and end time
  it('returns true when time slots have the same start and end time', () => {
    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(true)
  })

  // Test that the overlaps method returns false when the first time slot ends when the second starts
  it('returns false when the first time slot ends when the second starts', () => {
    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T11:00:00'), new Date('2026-09-20T12:00:00'))

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(false)
  })

  // Test that the overlaps method returns false when the first time slot starts when the second ends
  it('returns false when the first time slot starts when the second ends', () => {
    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T11:00:00'), new Date('2026-09-20T12:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(false)
  })

  // Test that the overlaps method returns false when the time slots are completely separate
  it('returns false when time slots are separate', () => {
    const firstTimeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    const secondTimeSlot = new TimeSlot(new Date('2026-09-20T12:00:00'), new Date('2026-09-20T13:00:00'))

    expect(firstTimeSlot.overlaps(secondTimeSlot)).toBe(false)
  })

  // Test that the constructor throws an error when the start time is after the end time
  it('throws an error when start time is not a Date', () => {
    const startTime = '2026-09-20T10:00:00'
    const endTime = new Date('2026-09-20T11:00:00')

    expect(() => {
      new TimeSlot(startTime, endTime)
    }).toThrow()
  })

  // Test that the constructor throws an error when the start time is after the end time
  it('throws an error when end time is not a Date', () => {
    const startTime = new Date('2026-09-20T10:00:00')
    const endTime = '2026-09-20T11:00:00'

    expect(() => {
      new TimeSlot(startTime, endTime)
    }).toThrow()
  })

  // Test that the constructor throws an error when the start time is after the end time
  it('throws an error when start time is an invalid Date', () => {
    const startTime = new Date('invalid')
    const endTime = new Date('2026-09-20T11:00:00')

    expect(() => {
      new TimeSlot(startTime, endTime)
    }).toThrow()
  })

  // Test that the constructor throws an error when the end time is before the start time
  it('throws an error when end time is an invalid Date', () => {
    const startTime = new Date('2026-09-20T10:00:00')
    const endTime = new Date('invalid')

    expect(() => {
      new TimeSlot(startTime, endTime)
    }).toThrow()
  })

  // Test that the overlaps method throws a TypeError when comparing with something that is not a TimeSlot
  it('throws a TypeError when comparing with something that is not a TimeSlot', () => {
    const timeSlot = new TimeSlot(new Date('2026-09-20T10:00:00'), new Date('2026-09-20T11:00:00'))

    expect(() => {
      timeSlot.overlaps('not a time slot')
    }).toThrow('otherTimeSlot must be a TimeSlot')
  })

  // Test that the start time cannot be changed through the getter
  it('does not allow the start time to be changed through the getter', () => {
    const timeSlot = new TimeSlot(new Date('2026-09-20T09:00:00'), new Date('2026-09-20T10:00:00'))

    const returnedStartTime = timeSlot.getStartTime()

    returnedStartTime.setHours(12)

    expect(timeSlot.getStartTime()).toEqual(new Date('2026-09-20T09:00:00'))
  })

  // Test that the end time cannot be changed through the getter
  it('does not allow the end time to be changed through the getter', () => {
    const timeSlot = new TimeSlot(new Date('2026-09-20T09:00:00'), new Date('2026-09-20T10:00:00'))

    const returnedEndTime = timeSlot.getEndTime()

    returnedEndTime.setHours(12)

    expect(timeSlot.getEndTime()).toEqual(new Date('2026-09-20T10:00:00'))
  })
})
