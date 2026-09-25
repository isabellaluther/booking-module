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
| `Resource` returns the correct id and name. | Created a `Resource` with id `room-101` and name `Study Room 101`, then checked the values returned by `getId()` and `getName()`. | ✅ Passed. |

#### Validation

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Resource` rejects an empty id. | Tried to create a `Resource` with an empty id and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects an empty name. | Tried to create a `Resource` with an empty name and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects an id that is not a string. | Tried to create a `Resource` with a numeric id and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects a name that is not a string. | Tried to create a `Resource` with a numeric name and checked that an error was thrown. | ✅ Passed. |

#### Input normalization

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Resource` trims whitespace from the id. | Created a `Resource` with whitespace around the id and checked that `getId()` returned the trimmed value. | ✅ Passed. |
| `Resource` trims whitespace from the name. | Created a `Resource` with whitespace around the name and checked that `getName()` returned the trimmed value. | ✅ Passed. |

### Booking

#### Basic functionality

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Booking` returns the correct id, resource, and time slot. | Created a `Booking` with a valid id, `Resource`, and `TimeSlot`, then checked the values returned by `getId()`, `getResource()`, and `getTimeSlot()`. | ✅ Passed. |

#### Validation

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Booking` rejects an empty id. | Tried to create a `Booking` with an empty id and checked that an error was thrown. | ✅ Passed. |
| `Booking` rejects an id that is not a string. | Tried to create a `Booking` with a numeric id and checked that an error was thrown. | ✅ Passed. |
| `Booking` rejects a resource that is not a `Resource`. | Tried to create a `Booking` with a string instead of a `Resource` and checked that an error was thrown. | ✅ Passed. |
| `Booking` rejects a time slot that is not a `TimeSlot`. | Tried to create a `Booking` with a string instead of a `TimeSlot` and checked that an error was thrown. | ✅ Passed. |

#### Input normalization

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Booking` trims whitespace from the id. | Created a `Booking` with whitespace around the id and checked that `getId()` returned the trimmed value. | ✅ Passed. |

### TimeSlot

#### Basic functionality

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `TimeSlot` returns the correct start and end time. | Created a `TimeSlot` with known start and end times and checked the values returned by `getStartTime()` and `getEndTime()`. | ✅ Passed. |
| `TimeSlot` calculates the duration in minutes correctly. | Created a `TimeSlot` from 10:00 to 11:30 and checked that `getDurationInMinutes()` returned `90`. | ✅ Passed. |

#### Overlap detection

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `TimeSlot.overlaps()` returns `true` when two time slots partially overlap. | Compared time slots 10:00–11:00 and 10:30–11:30 and checked that `overlaps()` returned `true`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `true` when the first time slot is completely inside the second. | Compared a shorter time slot inside a longer time slot and checked that `overlaps()` returned `true`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `true` when the second time slot is completely inside the first. | Compared a longer time slot containing a shorter one and checked that `overlaps()` returned `true`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `true` when two time slots have the same start and end time. | Created two time slots with identical start and end times and checked that `overlaps()` returned `true`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `false` when the first time slot ends exactly when the second starts. | Compared 10:00–11:00 with 11:00–12:00 and checked that `overlaps()` returned `false`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `false` when the first time slot starts exactly when the second ends. | Compared 11:00–12:00 with 10:00–11:00 and checked that `overlaps()` returned `false`. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `false` when the time slots are completely separate. | Compared two non-overlapping time slots and checked that `overlaps()` returned `false`. | ✅ Passed. |
| `TimeSlot.overlaps()` rejects an argument that is not a `TimeSlot`. | Passed a string to `overlaps()` and checked that the expected error was thrown. | ✅ Passed. |
| `TimeSlot.overlaps()` returns `true` when two time slots overlap. | Compared time slots 10:00–11:00 and 10:30–11:30 and checked that `overlaps()` returned `true`. | ✅ Passed. |

#### Validation

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `TimeSlot` rejects a start time that is after the end time. | Tried to create a `TimeSlot` where the start time was later than the end time and checked that an error was thrown. | ✅ Passed. |
| `TimeSlot` rejects a start time that is not a `Date`. | Passed a string as the start time and checked that an error was thrown. | ✅ Passed. |
| `TimeSlot` rejects an end time that is not a `Date`. | Passed a string as the end time and checked that an error was thrown. | ✅ Passed. |
| `TimeSlot` rejects an invalid start `Date`. | Passed `new Date('invalid')` as the start time and checked that an error was thrown. | ✅ Passed. |
| `TimeSlot` rejects an invalid end `Date`. | Passed `new Date('invalid')` as the end time and checked that an error was thrown. | ✅ Passed. |

#### Date protection

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| The start time cannot be changed through `getStartTime()`. | Retrieved the start time, modified the returned `Date`, and checked that the internal start time remained unchanged. | ✅ Passed. |
| The end time cannot be changed through `getEndTime()`. | Retrieved the end time, modified the returned `Date`, and checked that the internal end time remained unchanged. | ✅ Passed. |
| Changing the original start `Date` after creating a `TimeSlot` does not change the stored start time. | Created a `TimeSlot`, modified the original start `Date`, and checked that the time slot still contained the original value. | ✅ Passed. |
| Changing the original end `Date` after creating a `TimeSlot` does not change the stored end time. | Created a `TimeSlot`, modified the original end `Date`, and checked that the time slot still contained the original value. | ✅ Passed. |

### BookingCalendar

#### Booking management

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| A new `BookingCalendar` starts with no bookings. | Created a new `BookingCalendar` and checked that `getBookings()` returned an empty array. | ✅ Passed. |
| A booking can be added to the calendar. | Created a valid `Booking`, added it with `addBooking()`, and checked that `getBookings()` returned the booking. | ✅ Passed. |
| `BookingCalendar` rejects values that are not `Booking` instances. | Passed a string to `addBooking()` and checked that the expected error was thrown. | ✅ Passed. |
| Duplicate booking ids are rejected. | Added one booking and then tried to add another booking with the same id. Checked that an error was thrown. | ✅ Passed. |
| Overlapping bookings for the same resource are rejected. | Added a booking and then tried to add another booking for the same resource with an overlapping `TimeSlot`. Checked that a conflict error was thrown. | ✅ Passed. |
| Overlapping bookings for different resources are allowed. | Added overlapping bookings for two different resources and checked that both were stored in the calendar. | ✅ Passed. |
| A booking can be found by id. | Added a booking and checked that `getBookingById()` returned the correct booking. | ✅ Passed. |
| Looking up a missing booking id returns `undefined`. | Called `getBookingById()` with an id that was not in the calendar and checked that `undefined` was returned. | ✅ Passed. |
| A booking can be cancelled by id. | Added a booking, cancelled it with `cancelBooking()`, and checked that the calendar became empty. | ✅ Passed. |
| Cancelling a booking that does not exist throws an error. | Called `cancelBooking()` with an unknown id and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingById()` trims whitespace around the booking id. | Looked up a booking using an id with leading and trailing whitespace and checked that the booking was found. | ✅ Passed. |
| `cancelBooking()` trims whitespace around the booking id. | Cancelled a booking using an id with leading and trailing whitespace and checked that the booking was removed. | ✅ Passed. |

#### Resource and date lookup

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| Bookings can be retrieved for a specific resource. | Added bookings for two resources and checked that `getBookingsForResource()` only returned the booking for the requested resource. | ✅ Passed. |
| A resource with no bookings returns an empty array. | Requested bookings for a valid resource with no bookings and checked that an empty array was returned. | ✅ Passed. |
| Different `Resource` instances with the same id are treated as the same resource. | Created two `Resource` objects with the same id, added a booking using one of them, and checked that the booking was returned when looking up the other. | ✅ Passed. |
| Bookings can be retrieved for a specific date. | Added bookings on two different dates and checked that `getBookingsForDate()` returned only the booking affecting the requested date. | ✅ Passed. |
| A date with no bookings returns an empty array. | Requested bookings for a date with no bookings and checked that an empty array was returned. | ✅ Passed. |
| A booking that continues into the requested date is included. | Created a booking spanning midnight and checked that it was returned for the date on which it continued. | ✅ Passed. |
| A booking ending exactly when the requested date starts is not included. | Created a booking ending at midnight and checked that it was not returned for the following date. | ✅ Passed. |
| A booking starting exactly when the requested date starts is included. | Created a booking starting at midnight and checked that it was returned for that date. | ✅ Passed. |

#### Availability

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| Available time slots are returned when there are no bookings. | Searched from 09:00 to 12:00 with a 60-minute duration and checked that three correct time slots were returned. | ✅ Passed. |
| Time slots that conflict with an existing booking are excluded. | Added a booking from 10:00 to 11:00 and checked that only the non-conflicting 60-minute slots were returned. | ✅ Passed. |
| Returned time slots do not extend beyond the search interval. | Searched a 2.5-hour interval using 60-minute slots and checked that no slot extended past the end of the search interval. | ✅ Passed. |
| An empty array is returned when the requested duration is longer than the search interval. | Searched a one-hour interval using a 120-minute duration and checked that no slots were returned. | ✅ Passed. |
| One slot is returned when the duration exactly matches the search interval. | Searched a one-hour interval using a 60-minute duration and checked that exactly one matching slot was returned. | ✅ Passed. |
| No slots are returned when the whole search interval is already booked. | Booked the entire search period and checked that `getAvailableTimeSlots()` returned an empty array. | ✅ Passed. |
| A partially overlapping slot is excluded. | Added a booking from 09:30 to 10:30 and checked that no conflicting 60-minute slots were returned. | ✅ Passed. |
| Bookings for another resource do not affect availability. | Added a booking for another resource and checked that the searched resource still had its expected available slots. | ✅ Passed. |
| Availability can start immediately after an existing booking ends. | Added a booking from 10:00 to 10:30 and checked that a 60-minute slot from 10:30 to 11:30 was found. | ✅ Passed. |
| 30-minute time slots are returned correctly. | Searched from 09:00 to 10:30 with a 30-minute duration and checked that three consecutive slots were returned. | ✅ Passed. |
| 30-minute time slots are returned correctly around an existing booking. | Added a booking from 09:30 to 10:00 and checked that the available 30-minute slots before and after it were returned correctly. | ✅ Passed. |
| Available slots are returned correctly between multiple bookings. | Added two bookings in the search interval and checked that all valid 30-minute gaps were returned. | ✅ Passed. |
| A booking that starts before the search interval is respected. | Added a booking from 08:30 to 09:30 and checked that the first available slot started at 09:30. | ✅ Passed. |
| A booking that ends after the search interval is respected. | Added a booking from 10:30 to 11:30 and checked that no conflicting slot was returned before the search ended at 11:00. | ✅ Passed. |
| No slots are returned when a booking covers the whole search interval. | Added a booking that started before and ended after the search interval and checked that no available slots were returned. | ✅ Passed. |

#### Validation and errors

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `getBookingsForResource()` rejects a value that is not a `Resource`. | Passed a string instead of a `Resource` and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingsForDate()` rejects a value that is not a `Date`. | Passed a string instead of a `Date` and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingsForDate()` rejects an invalid `Date`. | Passed `new Date('invalid')` and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects a resource that is not a `Resource`. | Passed a string as the resource and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects a search time slot that is not a `TimeSlot`. | Passed a string as the search time slot and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects a duration that is not a number. | Passed the string `"60"` as the duration and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects zero or negative duration. | Passed `0` as the duration and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects `NaN` as the duration. | Passed `NaN` as the duration and checked that the expected error was thrown. | ✅ Passed. |
| `getAvailableTimeSlots()` rejects a non-integer duration. | Passed `30.5` as the duration and checked that the expected error was thrown. | ✅ Passed. |
| `hasBookingConflict()` rejects a value that is not a `Booking`. | Passed a string instead of a `Booking` and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingById()` rejects a booking id that is not a string. | Passed a number as the booking id and checked that the expected error was thrown. | ✅ Passed. |
| `cancelBooking()` rejects a booking id that is not a string. | Passed a number as the booking id and checked that the expected error was thrown. | ✅ Passed. |
| `getBookingById()` rejects an empty booking id. | Passed a whitespace-only id and checked that the expected error was thrown. | ✅ Passed. |
| `cancelBooking()` rejects an empty booking id. | Passed a whitespace-only id and checked that the expected error was thrown. | ✅ Passed. |