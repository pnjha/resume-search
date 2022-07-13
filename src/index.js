"use strict";

const { QueryHandler } = require("./lib");
const { getGenerator } = require("./generators/");
const Utils = require("./utils");

const query = 'backend OR "FULL SCK" OR ((java OR python) AND (vue OR react))';
const tokeninzedQuery = new QueryHandler(query).getTokeninzedQuery();
const postfixQuery = Utils.infixToPostfixConversion(tokeninzedQuery);

const sqlQueryGenerator = getGenerator("sql");
console.log(sqlQueryGenerator(postfixQuery));

const monogoQueryGenerator = getGenerator("mongodb");
console.log(JSON.stringify(monogoQueryGenerator(postfixQuery), null, 2));
