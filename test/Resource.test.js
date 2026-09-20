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
})