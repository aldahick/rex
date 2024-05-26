import { describe, expect, it } from "vitest";
import { stringToBytes } from "./byte.js";

describe("byte utils", () => {
  describe("stringToBytes()", () => {
    const cases = [
      {
        input: undefined,
        expected: undefined,
      },
      {
        input: "twelve",
        expected: new Error(
          'Invalid byte string: "twelve", expected e.g. "10GB"',
        ),
      },
      {
        input: "10bb",
        expected: new Error(`Invalid byte string: "10bb", invalid units "BB"`),
      },
      {
        input: "10GB",
        expected: 10 * 1024 ** 3,
      },
    ];

    for (const { input, expected } of cases) {
      it(`should return "${expected}" given input "${input}"`, () => {
        const actual = () => stringToBytes(input);
        if (expected instanceof Error) {
          expect(actual).toThrow(expected);
        } else {
          expect(actual()).toEqual(expected);
        }
      });
    }
  });
});
