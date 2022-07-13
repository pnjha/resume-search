"use strict";

const {
  mongoDBQueryGenerator
} = require("../../src/generators/mongodb-generator");

describe("test sql query generator", () => {
  test("should generate valid sql queries", () => {
    expect(
      mongoDBQueryGenerator(["A", "B", "OR", "C", "Q W E", "AND", "AND"])
    ).toEqual({
      $and: [
        { $and: [{ text: { $regex: "Q W E" } }, { text: { $regex: "C" } }] },
        { $or: [{ text: { $regex: "B" } }, { text: { $regex: "A" } }] }
      ]
    });
  });
});
