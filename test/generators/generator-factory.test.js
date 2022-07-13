"use strict";

const { getGenerator } = require("../../src/generators");
const { sqlQueryGenerator } = require("../../src/generators/sql-generator");
const {
  mongoDBQueryGenerator
} = require("../../src/generators/mongodb-generator");

describe("Query Generator Factory", () => {
  test("should return sql query generator factory instance", () => {
    expect(getGenerator("sql")).toEqual(sqlQueryGenerator);
  });
  test("should return mongodb query generator factory instance", () => {
    expect(getGenerator("mongodb")).toEqual(mongoDBQueryGenerator);
  });
  test("should throw error for invalid db class", () => {
    expect(getGenerator("postgresql")).toEqual(
      new Error("Invalid db class : postgresql")
    );
  });
});
