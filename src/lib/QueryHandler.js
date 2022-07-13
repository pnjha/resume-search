"use strict";

const { operators } = require("../config/properties");

class QueryHandler {
  constructor(query) {
    this.query = query;
  }
  handlePharses() {
    let quote = false;
    let newQuery = "";
    for (const char of this.query) {
      if (char === `'` || char === `"`) {
        quote = !quote;
      }
      if (quote && char === " ") {
        newQuery += "#";
      } else {
        newQuery += char;
      }
    }
    this.query = newQuery;
    return this;
  }
  handleSpaces() {
    let newQuery = "";
    for (const char of this.query) {
      if (char === operators["("] || char === operators[")"]) {
        newQuery += ` ${char} `;
      } else {
        newQuery += char;
      }
    }
    this.query = newQuery;
    return this;
  }
  queryTokeniser() {
    const tokenList = this.query.split(" ");
    const modifiedTokenList = [];
    for (const item of tokenList) {
      const str = item.trim().replace(/['"]+/g, "").replace(/[#]+/g, " ");
      if (str.length > 0) {
        modifiedTokenList.push(str);
      }
    }
    return modifiedTokenList;
  }
  getTokeninzedQuery() {
    return this.handlePharses().handleSpaces().queryTokeniser();
  }
}

module.exports = QueryHandler;
