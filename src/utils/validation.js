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

/**
 * Validates that a value is a Date object.
 *
 * @param {*} value - The value to validate.
 * @param {string} name - The name of the argument.
 * @throws {TypeError} If the value is not a Date.
 */
export function validateDate(value, name) {
  if (!(value instanceof Date)) {
    throw new TypeError(`${name} must be a Date`)
  }
}

/**
 * Validates that a Date object contains a valid date.
 * The value must already have been validated as a Date.
 *
 * @param {Date} value - The Date object to validate.
 * @param {string} name - The name of the argument.
 * @throws {TypeError} If the Date is invalid.
 */
export function validateValidDate(value, name) {
  if (Number.isNaN(value.getTime())) {
    throw new TypeError(`${name} must be a valid Date`)
  }
}

/**
 * Validates that a value is an instance of a specified class.
 *
 * @param {*} value - The value to validate.
 * @param {new(...args: any[]) => object} expectedClass - The expected class.
 * @param {string} name - The name of the argument.
 * @throws {TypeError} If the value is not an instance of the expected class.
 */
export function validateInstance(value, expectedClass, name) {
  if (!(value instanceof expectedClass)) {
    throw new TypeError(`${name} must be a ${expectedClass.name}`)
  }
}

/**
 * Validates that a value is a positive integer.
 *
 * @param {*} value - The value to validate.
 * @param {string} name - The name of the argument.
 * @throws {TypeError} If the value is not a valid integer.
 * @throws {Error} If the value is zero or negative.
 */
export function validatePositiveInteger(value, name) {
  if (typeof value !== 'number') {
    throw new TypeError(`${name} must be a number`)
  }

  if (Number.isNaN(value)) {
    throw new TypeError(`${name} must be a valid number`)
  }

  if (!Number.isInteger(value)) {
    throw new TypeError(`${name} must be an integer`)
  }

  if (value <= 0) {
    throw new Error(`${name} must be greater than zero`)
  }
}
