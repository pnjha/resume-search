"use strict";

const _ = require("lodash");
const { Stack } = require("../lib");
const { operators, precedence } = require("../config/properties");

function isValidOperator(operator) {
  return !_.isUndefined(operators[operator]);
}

function getOperatorPrecedenc(operator) {
  return precedence[operator];
}

function infixToPostfixConversion(infixExpression) {
  const postfixExpression = [];
  const stack = new Stack();
  stack.push(operators.SOL);

  for (const infixElement of infixExpression) {
    if (isValidOperator(infixElement)) {
      if (infixElement === operators[")"]) {
        while (stack.top() !== operators["("]) {
          postfixExpression.push(stack.pop());
        }
        stack.pop();
      } else if (infixElement === operators["("]) {
        stack.push(infixElement);
      } else if (
        getOperatorPrecedenc(infixElement) > getOperatorPrecedenc(stack.top())
      ) {
        stack.push(infixElement);
      } else {
        while (
          getOperatorPrecedenc(infixElement) <=
            getOperatorPrecedenc(stack.top()) &&
          !stack.empty()
        ) {
          postfixExpression.push(stack.pop());
        }
        stack.push(infixElement);
      }
    } else {
      postfixExpression.push(infixElement);
    }
  }
  while (stack.top() !== operators.SOL) {
    postfixExpression.push(stack.pop());
  }
  return postfixExpression;
}

module.exports = {
  infixToPostfixConversion,
  getOperatorPrecedenc,
  isValidOperator
};
