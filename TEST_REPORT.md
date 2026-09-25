# Test Report

## Summary

I tested the module using automated unit tests with Vitest. I chose unit tests because the module consists of reusable classes and methods that can be tested independently without a user interface or a database.

In the tests, I create instances of the module's classes with both valid and invalid input values. I then compare the actual result with the expected result. I also test error cases to make sure that the correct errors are thrown when invalid values are used.

The complete test suite can be run with:

```bash
npm run test
```

The tests are located in the `test` directory and cover the public functionality of `Booking`, `BookingCalendar`, `Resource`, and `TimeSlot`.

## Test Results

### Resource

#### Basic functionality

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Resource` returns the correct id and name. | Automated unit test (Vitest): created a `Resource` with id `room-101` and name `Study Room 101`, then checked the values returned by `getId()` and `getName()`. | ✅ Passed. |

#### Validation

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Resource` rejects an empty id. | Automated unit test (Vitest): tried to create a `Resource` with an empty id and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects an empty name. | Automated unit test (Vitest): tried to create a `Resource` with an empty name and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects an id that is not a string. | Automated unit test (Vitest): tried to create a `Resource` with a numeric id and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects a name that is not a string. | Automated unit test (Vitest): tried to create a `Resource` with a numeric name and checked that an error was thrown. | ✅ Passed. |

#### Input normalization

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Resource` trims whitespace from the id. | Automated unit test (Vitest): created a `Resource` with whitespace around the id and checked that `getId()` returned the trimmed value. | ✅ Passed. |
| `Resource` trims whitespace from the name. | Automated unit test (Vitest): created a `Resource` with whitespace around the name and checked that `getName()` returned the trimmed value. | ✅ Passed. |

### Booking

#### Basic functionality

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Booking` returns the correct id, resource, and time slot. | Automated unit test (Vitest): created a `Booking` with a valid id, `Resource`, and `TimeSlot`, then checked the values returned by `getId()`, `getResource()`, and `getTimeSlot()`. | ✅ Passed. |

#### Validation

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Booking` rejects an empty id. | Automated unit test (Vitest): tried to create a `Booking` with an empty id and checked that an error was thrown. | ✅ Passed. |
| `Booking` rejects an id that is not a string. | Automated unit test (Vitest): tried to create a `Booking` with a numeric id and checked that an error was thrown. | ✅ Passed. |
| `Booking` rejects a resource that is not a `Resource`. | Automated unit test (Vitest): tried to create a `Booking` with a string instead of a `Resource` and checked that an error was thrown. | ✅ Passed. |
| `Booking` rejects a time slot that is not a `TimeSlot`. | Automated unit test (Vitest): tried to create a `Booking` with a string instead of a `TimeSlot` and checked that an error was thrown. | ✅ Passed. |

#### Input normalization

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Booking` trims whitespace from the id. | Automated unit test (Vitest): created a `Booking` with whitespace around the id and checked that `getId()` returned the trimmed value. | ✅ Passed. |

### TimeSlot

#### Basic functionality

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `TimeSlot` returns the correct start and end time. | Automated unit test (Vitest): created a `TimeSlot` with known start and end times and checked the values returned by `getStartTime()` and `getEndTime()`. | ✅ Passed. |
| `TimeSlot` calculates the duration in minutes correctly. | Automated unit test (Vitest): created a `TimeSlot` from 10:00 to 11:30 and checked that `getDurationInMinutes()` returned `90`. | ✅ Passed. |

#### Overlap detection

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `TimeSlot.overlaps()` returns `true` when two time slots partially overlap. | Automated unit test (Vitest): compared time slots 10:00–11:00 and 10:30–11:30 and checked that `overlaps()` returned `true`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `true` when the first time slot is completely inside the second. | Automated unit test (Vitest): compared a shorter time slot inside a longer time slot and checked that `overlaps()` returned `true`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `true` when the second time slot is completely inside the first. | Automated unit test (Vitest): compared a longer time slot containing a shorter one and checked that `overlaps()` returned `true`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `true` when two time slots have the same start and end time. | Automated unit test (Vitest): created two time slots with identical start and end times and checked that `overlaps()` returned `true`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `false` when the first time slot ends exactly when the second starts. | Automated unit test (Vitest): compared 10:00–11:00 with 11:00–12:00 and checked that `overlaps()` returned `false`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `false` when the first time slot starts exactly when the second ends. | Automated unit test (Vitest): compared 11:00–12:00 with 10:00–11:00 and checked that `overlaps()` returned `false`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `false` when the time slots are completely separate. | Automated unit test (Vitest): compared two non-overlapping time slots and checked that `overlaps()` returned `false`. | ✅ Passed. |
| `TimeSlot.overlaps()` rejects an argument that is not a `TimeSlot`. | Automated unit test (Vitest): passed a string to `overlaps()` and checked that the expected error was thrown. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `true` when two time slots overlap. | Automated unit test (Vitest): compared time slots 10:00–11:00 and 10:30–11:30 and checked that `overlaps()` returned `true`. | ✅ Passed. |

#### Validation

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `TimeSlot` rejects a start time that is after the end time. | Automated unit test (Vitest): tried to create a `TimeSlot` where the start time was later than the end time and checked that an error was thrown. | ✅ Passed. |
| `TimeSlot` rejects a start time that is not a `Date`. | Automated unit test (Vitest): passed a string as the start time and checked that an error was thrown. | ✅ Passed. |
| `TimeSlot` rejects an end time that is not a `Date`. | Automated unit test (Vitest): passed a string as the end time and checked that an error was thrown. | ✅ Passed. |
| `TimeSlot` rejects an invalid start `Date`. | Automated unit test (Vitest): passed `new Date('invalid')` as the start time and checked that an error was thrown. | ✅ Passed. |
| `TimeSlot` rejects an invalid end `Date`. | Automated unit test (Vitest): passed `new Date('invalid')` as the end time and checked that an error was thrown. | ✅ Passed. |

#### Date protection

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| The start time cannot be changed through `getStartTime()`. | Automated unit test (Vitest): retrieved the start time, modified the returned `Date`, and checked that the internal start time remained unchanged. | ✅ Passed. |
| The end time cannot be changed through `getEndTime()`. | Automated unit test (Vitest): retrieved the end time, modified the returned `Date`, and checked that the internal end time remained unchanged. | ✅ Passed. |
| Changing the original start `Date` after creating a `TimeSlot` does not change the stored start time. | Automated unit test (Vitest): created a `TimeSlot`, modified the original start `Date`, and checked that the time slot still contained the original value. | ✅ Passed. |
| Changing the original end `Date` after creating a `TimeSlot` does not change the stored end time. | Automated unit test (Vitest): created a `TimeSlot`, modified the original end `Date`, and checked that the time slot still contained the original value. | ✅ Passed. |

### BookingCalendar

#### Booking management

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| A new `BookingCalendar` starts with no bookings. | Automated unit test (Vitest): created a new `BookingCalendar` and checked that `getBookings()` returned an empty array. | ✅ Passed. |
| A booking can be added to the calendar. | Automated unit test (Vitest): created a valid `Booking`, added it with `addBooking()`, and checked that `getBookings()` returned the booking. | ✅ Passed. |
| `BookingCalendar` rejects values that are not `Booking` instances. | Automated unit test (Vitest): passed a string to `addBooking()` and checked that the expected error was thrown. | ✅ Passed. |
| Duplicate booking ids are rejected. | Automated unit test (Vitest): added one booking and then tried to add another booking with the same id. Checked that an error was thrown. | ✅ Passed. |
| Overlapping bookings for the same resource are rejected. | Automated unit test (Vitest): added a booking and then tried to add another booking for the same resource with an overlapping `TimeSlot`. Checked that a conflict error was thrown. | ✅ Passed. |
| Overlapping bookings for different resources are allowed. | Automated unit test (Vitest): added overlapping bookings for two different resources and checked that both were stored in the calendar. | ✅ Passed. |
| A booking can be found by id. | Automated unit test (Vitest): added a booking and checked that `getBookingById()` returned the correct booking. | ✅ Passed. |
| Looking up a missing booking id returns `undefined`. | Automated unit test (Vitest): called `getBookingById()` with an id that was not in the calendar and checked that `undefined` was returned. | ✅ Passed. |
| A booking can be cancelled by id. | Automated unit test (Vitest): added a booking, cancelled it with `cancelBooking()`, and checked that the calendar became empty. | ✅ Passed. |
| Cancelling a booking that does not exist throws an error. | Automated unit test (Vitest): called `cancelBooking()` with an unknown id and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingById()` trims whitespace around the booking id. | Automated unit test (Vitest): looked up a booking using an id with leading and trailing whitespace and checked that the booking was found. | ✅ Passed. |
| `cancelBooking()` trims whitespace around the booking id. | Automated unit test (Vitest): cancelled a booking using an id with leading and trailing whitespace and checked that the booking was removed. | ✅ Passed. |

#### Resource and date lookup

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| Bookings can be retrieved for a specific resource. | Automated unit test (Vitest): added bookings for two resources and checked that `getBookingsForResource()` only returned the booking for the requested resource. | ✅ Passed. |
| A resource with no bookings returns an empty array. | Automated unit test (Vitest): requested bookings for a valid resource with no bookings and checked that an empty array was returned. | ✅ Passed. |
| Different `Resource` instances with the same id are treated as the same resource. | Automated unit test (Vitest): created two `Resource` objects with the same id, added a booking using one of them, and checked that the booking was returned when looking up the other. | ✅ Passed. |
| Bookings can be retrieved for a specific date. | Automated unit test (Vitest): added bookings on two different dates and checked that `getBookingsForDate()` returned only the booking affecting the requested date. | ✅ Passed. |
| A date with no bookings returns an empty array. | Automated unit test (Vitest): requested bookings for a date with no bookings and checked that an empty array was returned. | ✅ Passed. |
| A booking that continues into the requested date is included. | Automated unit test (Vitest): created a booking spanning midnight and checked that it was returned for the date on which it continued. | ✅ Passed. |
| A booking ending exactly when the requested date starts is not included. | Automated unit test (Vitest): created a booking ending at midnight and checked that it was not returned for the following date. | ✅ Passed. |
| A booking starting exactly when the requested date starts is included. | Automated unit test (Vitest): created a booking starting at midnight and checked that it was returned for that date. | ✅ Passed. |

#### Availability

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| Available time slots are returned when there are no bookings. | Automated unit test (Vitest): searched from 09:00 to 12:00 with a 60-minute duration and checked that three correct time slots were returned. | ✅ Passed. |
| Time slots that conflict with an existing booking are excluded. | Automated unit test (Vitest): added a booking from 10:00 to 11:00 and checked that only the non-conflicting 60-minute slots were returned. | ✅ Passed. |
| Returned time slots do not extend beyond the search interval. | Automated unit test (Vitest): searched a 2.5-hour interval using 60-minute slots and checked that no slot extended past the end of the search interval. | ✅ Passed. |
| An empty array is returned when the requested duration is longer than the search interval. | Automated unit test (Vitest): searched a one-hour interval using a 120-minute duration and checked that no slots were returned. | ✅ Passed. |
| One slot is returned when the duration exactly matches the search interval. | Automated unit test (Vitest): searched a one-hour interval using a 60-minute duration and checked that exactly one matching slot was returned. | ✅ Passed. |
| No slots are returned when the whole search interval is already booked. | Automated unit test (Vitest): booked the entire search period and checked that `getAvailableTimeSlots()` returned an empty array. | ✅ Passed. |
| A partially overlapping slot is excluded. | Automated unit test (Vitest): added a booking from 09:30 to 10:30 and checked that no conflicting 60-minute slots were returned. | ✅ Passed. |
| Bookings for another resource do not affect availability. | Automated unit test (Vitest): added a booking for another resource and checked that the searched resource still had its expected available slots. | ✅ Passed. |
| Availability can start immediately after an existing booking ends. | Automated unit test (Vitest): added a booking from 10:00 to 10:30 and checked that a 60-minute slot from 10:30 to 11:30 was found. | ✅ Passed. |
| 30-minute time slots are returned correctly. | Automated unit test (Vitest): searched from 09:00 to 10:30 with a 30-minute duration and checked that three consecutive slots were returned. | ✅ Passed. |
| 30-minute time slots are returned correctly around an existing booking. | Automated unit test (Vitest): added a booking from 09:30 to 10:00 and checked that the available 30-minute slots before and after it were returned correctly. | ✅ Passed. |
| Available slots are returned correctly between multiple bookings. | Automated unit test (Vitest): added two bookings in the search interval and checked that all valid 30-minute gaps were returned. | ✅ Passed. |
| A booking that starts before the search interval is respected. | Automated unit test (Vitest): added a booking from 08:30 to 09:30 and checked that the first available slot started at 09:30. | ✅ Passed. |
| A booking that ends after the search interval is respected. | Automated unit test (Vitest): added a booking from 10:30 to 11:30 and checked that no conflicting slot was returned before the search ended at 11:00. | ✅ Passed. |
| No slots are returned when a booking covers the whole search interval. | Automated unit test (Vitest): added a booking that started before and ended after the search interval and checked that no available slots were returned. | ✅ Passed. |

#### Validation and errors

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `getBookingsForResource()` rejects a value that is not a `Resource`. | Automated unit test (Vitest): passed a string instead of a `Resource` and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingsForDate()` rejects a value that is not a `Date`. | Automated unit test (Vitest): passed a string instead of a `Date` and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingsForDate()` rejects an invalid `Date`. | Automated unit test (Vitest): passed `new Date('invalid')` and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects a resource that is not a `Resource`. | Automated unit test (Vitest): passed a string as the resource and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects a search time slot that is not a `TimeSlot`. | Automated unit test (Vitest): passed a string as the search time slot and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects a duration that is not a number. | Automated unit test (Vitest): passed the string `"60"` as the duration and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects zero or negative duration. | Automated unit test (Vitest): passed `0` as the duration and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects `NaN` as the duration. | Automated unit test (Vitest): passed `NaN` as the duration and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects a non-integer duration. | Automated unit test (Vitest): passed `30.5` as the duration and checked that the expected error was thrown. | ✅ Passed. |
| `hasBookingConflict()` rejects a value that is not a `Booking`. | Automated unit test (Vitest): passed a string instead of a `Booking` and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingById()` rejects a booking id that is not a string. | Automated unit test (Vitest): passed a number as the booking id and checked that the expected error was thrown. | ✅ Passed. |
| `cancelBooking()` rejects a booking id that is not a string. | Automated unit test (Vitest): passed a number as the booking id and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingById()` rejects an empty booking id. | Automated unit test (Vitest): passed a whitespace-only id and checked that the expected error was thrown. | ✅ Passed. |
| `cancelBooking()` rejects an empty booking id. | Automated unit test (Vitest): passed a whitespace-only id and checked that the expected error was thrown. | ✅ Passed. |