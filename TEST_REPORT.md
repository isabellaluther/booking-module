# Test Report

<!--
    Commit this file to the root of your GitHub repository, alongside your module's code.
-->

## Summary

Answer:

## Summary

Answer:

I tested the module using automated unit tests with Vitest. I chose unit tests because the module consists of reusable classes and methods that can be tested independently without a user interface or a database.

In the tests, I create instances of the module's classes with both valid and invalid input values. I then compare the actual result with the expected result. I also test error cases to make sure that the correct errors are thrown when invalid values are used.

The complete test suite can be run with:

```bash
npm run test
```

The tests are located in the `test` directory and cover the public functionality of `Booking`, `BookingCalendar`, `Resource`, and `TimeSlot`.

## Test Results

### Resource

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |
| `Resource` returns the correct id and name. | Automated unit test (Vitest): created a `Resource` with id `room-101` and name `Study Room 101`, then checked the values returned by `getId()` and `getName()`. | ✅ Passed. |
| `Resource` rejects an empty id. | Automated unit test (Vitest): tried to create a `Resource` with an empty id and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects an empty name. | Automated unit test (Vitest): tried to create a `Resource` with an empty name and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects an id that is not a string. | Automated unit test (Vitest): tried to create a `Resource` with a numeric id and checked that an error was thrown. | ✅ Passed. |
| `Resource` rejects a name that is not a string. | Automated unit test (Vitest): tried to create a `Resource` with a numeric name and checked that an error was thrown. | ✅ Passed. |
| `Resource` trims whitespace from the id. | Automated unit test (Vitest): created a `Resource` with whitespace around the id and checked that `getId()` returned the trimmed value. | ✅ Passed. |
| `Resource` trims whitespace from the name. | Automated unit test (Vitest): created a `Resource` with whitespace around the name and checked that `getName()` returned the trimmed value. | ✅ Passed. |