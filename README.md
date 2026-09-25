# Booking Module

## About

Booking Module is a reusable JavaScript module for managing bookable resources, time slots, and bookings.

The module is designed to be used by other applications that need booking functionality without depending on a specific user interface, database, or application type.

It provides functionality for creating resources and bookings, checking booking conflicts, retrieving bookings by resource or date, cancelling bookings, and calculating available time slots.

## Features

- Create bookable resources.
- Create time slots with start and end times.
- Create bookings that connect a resource with a time slot.
- Prevent conflicting bookings for the same resource.
- Allow overlapping bookings for different resources.
- Retrieve bookings by id, resource, or date.
- Cancel bookings by id.
- Calculate available time slots for a resource.
- Support different booking durations in whole minutes.
- Validate input values and reject invalid input.
- Protect internal date values from external modification.

## Installation

Clone the repository:

```bash
git clone git@github.com:isabellaluther/booking-module.git
```

Move into the project directory:

```bash
cd booking-module
```

Install the development dependencies:

```bash
npm install
```

## Usage

The public classes are exported from `src/index.js`.

Example:

```js
import {
  Booking,
  BookingCalendar,
  Resource,
  TimeSlot
} from './src/index.js'

const resource = new Resource(
  'room-101',
  'Study Room 101'
)

const timeSlot = new TimeSlot(
  new Date('2026-09-20T10:00:00'),
  new Date('2026-09-20T11:00:00')
)

const booking = new Booking(
  'booking-1',
  resource,
  timeSlot
)

const calendar = new BookingCalendar()

calendar.addBooking(booking)

console.log(calendar.getBookings())
```

## API

### Resource

Represents something that can be booked.

```js
new Resource(id, name)
```

Public methods:

- `getId()` - Returns the resource id.
- `getName()` - Returns the resource name.

The id and name must be non-empty strings. Leading and trailing whitespace is removed.

### TimeSlot

Represents a period between a start time and an end time.

```js
new TimeSlot(startTime, endTime)
```

Public methods:

- `getStartTime()` - Returns the start time.
- `getEndTime()` - Returns the end time.
- `getDurationInMinutes()` - Returns the duration in minutes.
- `overlaps(otherTimeSlot)` - Returns whether two time slots overlap.

Both values must be valid `Date` objects, and the start time must be before the end time.

### Booking

Represents a booking of a resource during a time slot.

```js
new Booking(id, resource, timeSlot)
```

Public methods:

- `getId()` - Returns the booking id.
- `getResource()` - Returns the booked resource.
- `getTimeSlot()` - Returns the booking time slot.

The booking id must be a non-empty string. Leading and trailing whitespace is removed.

The resource must be a `Resource`, and the time slot must be a `TimeSlot`.

### BookingCalendar

Manages bookings and booking availability.

```js
new BookingCalendar()
```

Public methods:

- `getBookings()` - Returns all bookings.
- `getBookingById(bookingId)` - Returns a booking with the specified id, or `undefined` if no booking is found.
- `getBookingsForResource(resource)` - Returns bookings for a resource.
- `getBookingsForDate(date)` - Returns bookings that affect a specific date.
- `getAvailableTimeSlots(resource, searchTimeSlot, durationInMinutes)` - Returns available time slots for a resource.
- `addBooking(booking)` - Adds a booking.
- `cancelBooking(bookingId)` - Removes a booking.
- `hasBookingConflict(booking)` - Checks whether a booking conflicts with an existing booking.

Leading and trailing whitespace in booking ids is ignored when looking up or cancelling a booking.

## Availability

`getAvailableTimeSlots()` searches for available booking periods within a specified `TimeSlot`.

The requested duration must be a positive whole number of minutes.

Example:

```js
const searchTimeSlot = new TimeSlot(
  new Date('2026-09-20T09:00:00'),
  new Date('2026-09-20T12:00:00')
)

const availableTimeSlots =
  calendar.getAvailableTimeSlots(
    resource,
    searchTimeSlot,
    30
  )
```

Available slots are calculated from the actual free periods between bookings.

For example, if an existing booking ends at `10:30`, an available slot may begin at `10:30` if the requested duration fits before the next booking or before the search interval ends.

## Requirements

- Node.js 24.12.0 or later
- ECMAScript Modules (ESM)

Development tools include:

- Vitest
- ESLint
- Prettier
- `@lnu/eslint-config`

The complete list of development dependencies is available in `package.json`.

## Testing

The module is tested using automated unit tests with Vitest.

Run all tests with:

```bash
npm run test
```

Run the linter with:

```bash
npm run lint
```

Format the source and test files with:

```bash
npm run format
```

The full test documentation is available in `TEST_REPORT.md`.

## Project Structure

```text
booking-module/
├── src/
│   ├── Booking.js
│   ├── BookingCalendar.js
│   ├── index.js
│   ├── Resource.js
│   └── TimeSlot.js
├── test/
│   ├── Booking.test.js
│   ├── BookingCalendar.test.js
│   ├── Resource.test.js
│   └── TimeSlot.test.js
├── TEST_REPORT.md
├── README.md
├── package.json
└── LICENSE
```

## Scope

The module handles the core booking logic.

It does not provide:

- a graphical user interface
- database storage
- user authentication
- network or API functionality
- persistence between program executions

These concerns can be implemented by an application that uses the module.

## License

This project is released under the Unlicense.