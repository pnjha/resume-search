"use strict";

const Utils = require("../../src/utils");

describe("Utils tests", () => {
  test("should validate operator", () => {
    expect(Utils.isValidOperator("*")).toBeFalsy();
    expect(Utils.isValidOperator("OR")).toBeTruthy();
    expect(Utils.isValidOperator("AND")).toBeTruthy();
    expect(Utils.isValidOperator("SOL")).toBeTruthy();
  });
  test("should get operator precedence", () => {
    expect(Utils.getOperatorPrecedenc("AND")).toEqual(2);
    expect(Utils.getOperatorPrecedenc("OR")).toEqual(2);
    expect(Utils.getOperatorPrecedenc("(")).toEqual(1);
    expect(Utils.getOperatorPrecedenc(")")).toEqual(1);
    expect(Utils.getOperatorPrecedenc("SOL")).toEqual(0);
  });
  test("should convert infix expression to postfix expresssion", () => {
    const query = [
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
    ];
    expect(Utils.infixToPostfixConversion(query)).toEqual([
      "A",
      "B",
      "OR",
      "C",
      "Q W E",
      "AND",
      "AND"
    ]);
  });
});
