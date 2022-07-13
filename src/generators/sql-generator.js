"use strict";

const { Stack } = require("../lib");
const { isValidOperator } = require("../utils");

function sqlQueryGenerator(expression) {
  const stack = new Stack();
  for (const element of expression) {
    if (isValidOperator(element)) {
      const firstStatement = stack.pop();
      const secondStatement = stack.pop();
      stack.push(`(${firstStatement} ${element} ${secondStatement})`);
    } else {
      stack.push(`text LIKE '%${element}%'`);
    }
  }
  return `SELECT * FROM Resumes WHERE ${stack.pop()};`;
}

module.exports = { sqlQueryGenerator };
