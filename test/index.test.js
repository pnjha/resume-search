"use strict";

const { QueryHandler } = require("../src/lib");
const { getGenerator } = require("../src/generators");
const Utils = require("../src/utils");

const query = 'backend OR "FULL SCK" OR ((java OR python) AND (vue OR react))';
const tokeninzedQuery = new QueryHandler(query).getTokeninzedQuery();
const postfixQuery = Utils.infixToPostfixConversion(tokeninzedQuery);

describe("Module Test", () => {
  test("should generate correct sql query for the given input query", () => {
    const sqlQueryGenerator = getGenerator("sql");
    expect(sqlQueryGenerator(postfixQuery)).toEqual(
      "SELECT * FROM Resumes WHERE (((text LIKE '%react%' OR text LIKE '%vue%') AND (text LIKE '%python%' OR text LIKE '%java%')) OR (text LIKE '%FULL SCK%' OR text LIKE '%backend%'));"
    );
  });
  test("should generate correct mongodb query for the given input query", () => {
    const monogoQueryGenerator = getGenerator("mongodb");
    expect(monogoQueryGenerator(postfixQuery)).toEqual({
      $or: [
        { text: { $regex: "FULL SCK" } },
        { text: { $regex: "backend" } },
        {
          $and: [
            {
              $or: [{ text: { $regex: "react" } }, { text: { $regex: "vue" } }]
            },
            {
              $or: [
                { text: { $regex: "python" } },
                { text: { $regex: "java" } }
              ]
            }
          ]
        }
      ]
    });
  });
});
