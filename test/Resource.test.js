/**
 * Contains tests for the Resource class.
 *
 * @file test/Resource.test.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

import { describe, expect, it } from 'vitest'
import { Resource } from '../src/Resource.js'

/**
 * Tests the functionality of the Resource class.
 */
describe('Resource', () => {
  // Test that the getId and getName methods return the correct values.
  it('returns the id and name', () => {
    const resource = new Resource('room-101', 'Study Room 101')

    expect(resource.getId()).toBe('room-101')
    expect(resource.getName()).toBe('Study Room 101')
  })

  // Test that the constructor throws an error when id is empty.
  it('throws an error when id is empty', () => {
    expect(() => {
      new Resource('', 'Study Room 101')
    }).toThrow()
  })

  // Test that the constructor throws an error when name is empty.
  it('throws an error when name is empty', () => {
    expect(() => {
      new Resource('room-101', '')
    }).toThrow()
  })

  // Test that the constructor throws an error when id is not a string.
  it('throws an error when id is not a string', () => {
    expect(() => {
      new Resource(101, 'Study Room 101')
    }).toThrow()
  })

  // Test that the constructor throws an error when name is not a string.
  it('throws an error when name is not a string', () => {
    expect(() => {
      new Resource('room-101', 101)
    }).toThrow()
  })

  // Test that the constructor trims whitespace from the resource id.
  it('trims whitespace from the resource id', () => {
    const resource = new Resource(' room-101 ', 'Study Room 101')

    expect(resource.getId()).toBe('room-101')
  })
})
