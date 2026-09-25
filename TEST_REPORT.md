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

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------ |