const { isLeapYear } = require("./tools.js");

describe("Test isLeapYear", () => {
  it("should return true for leap year", () => {
    expect(isLeapYear(2020)).toBe(true);
  });
  it("should return false for non-leap year", () => {
    expect(isLeapYear(2023)).toBe(false);
  });
  it("should return undefined for invalid input", () => {
    expect(isLeapYear("TwentyTwentyFour")).toBe(undefined);
    expect(isLeapYear("2023.99")).toBe(undefined);
    expect(isLeapYear("0")).toBe(undefined);
    expect(isLeapYear("-1")).toBe(undefined);
  });
  it("should return true for a leap year in string format", () => {
    expect(isLeapYear("2024")).toBe(true);
  });
});
  