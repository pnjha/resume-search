"use strict";

const { sqlQueryGenerator } = require("../../src/generators/sql-generator");

describe("test sql query generator", () => {
  test("should generate valid sql queries", () => {
    expect(
      sqlQueryGenerator(["A", "B", "OR", "C", "Q W E", "AND", "AND"])
    ).toEqual(
      "SELECT * FROM Resumes WHERE ((text LIKE '%Q W E%' AND text LIKE '%C%') AND (text LIKE '%B%' OR text LIKE '%A%'));"
    );
  });
});
