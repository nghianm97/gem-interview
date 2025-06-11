import { describe, expect, it } from "vitest";
import { parseInput } from "./parseInput";

describe("parseInput", () => {
  it("should parse positive number with comma", () => {
    expect(parseInput("12,5")).toBe(12.5);
  });

  it("should keep number < 100 for %", () => {
    expect(parseInput("99.99")).toBe(100.0);
  });

  it("should return 0 for non-numeric input", () => {
    expect(parseInput("abc")).toBe(0);
  });

  it("should extract valid number from string", () => {
    expect(parseInput("12a456a")).toBe(12);
    expect(parseInput("a34123sa45")).toBe(34123);
  });

  it("should limit decimal to 1 digit", () => {
    expect(parseInput("3.14159")).toBe(3.1);
  });

  it("should handle multiple dots", () => {
    expect(parseInput("12.3.4")).toBe(12.3);
  });
});
