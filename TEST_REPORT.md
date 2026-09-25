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