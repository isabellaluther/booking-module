/**
 * Utility functions for validating input values.
 *
 * @file src/utils/validation.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

/**
 * Validates that a value is a non-empty string.
 *
 * @param {string} value - The value to validate.
 * @param {string} name - The name of the argument.
 * @throws {TypeError} If the value is not a string.
 * @throws {Error} If the string is empty.
 */
export function validateNonEmptyString(value, name) {
  if (typeof value !== 'string') {
    throw new TypeError(`${name} must be a string`)
  }

  if (value.trim() === '') {
    throw new Error(`${name} must not be empty`)
  }
}
