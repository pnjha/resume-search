"use strict";

const { QueryHandler } = require("../../src/lib");

describe("QueryHandler tests", () => {
  test("should handle phrases in the query", () => {
    const query = '"Hello World" AND "Hello Javascript World"';
    const queryHandler = new QueryHandler(query);
    queryHandler.handlePharses();
    expect(queryHandler.query).toEqual(
      '"Hello#World" AND "Hello#Javascript#World"'
    );
  });
  test("should handle spaces in the query", () => {
    const query = "(A OR B)AND(C AND D)";
    const queryHandler = new QueryHandler(query);
    queryHandler.handleSpaces();
    expect(queryHandler.query).toEqual(" ( A OR B ) AND ( C AND D ) ");
  });
  test("should tokenize the query and return list of query tokens", () => {
    const query = "(A OR B)AND(C AND 'Q W E')";
    const queryHandler = new QueryHandler(query);
    const tokenizedQuery = queryHandler.getTokeninzedQuery();
    expect(tokenizedQuery).toEqual([
      "(",
      "A",
      "OR",
      "B",
      ")",
      "AND",
      "(",
      "C",
      "AND",
      "Q W E",
      ")"
    ]);
  });
});
