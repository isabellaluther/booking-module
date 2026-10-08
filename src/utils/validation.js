/**
 * Utility functions for validating input values.
 *
 * @file src/utils/validation.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 * @license Unlicense
 */

/**
 * Validates that a value is a string.
 *
 * @param {*} value - The value to validate.
 * @param {string} name - The name of the argument.
 * @throws {TypeError} If the value is not a string.
 */
export function validateString(value, name) {
  if (typeof value !== 'string') {
    throw new TypeError(`${name} must be a string`)
  }
}

/**
 * Validates that a string is not empty.
 * The value must already have been validated as a string.
 *
 * @param {string} value - The string to validate.
 * @param {string} name - The name of the argument.
 * @throws {Error} If the string is empty.
 */
export function validateNonEmptyString(value, name) {
  if (value.trim() === '') {
    throw new Error(`${name} must not be empty`)
  }
}
