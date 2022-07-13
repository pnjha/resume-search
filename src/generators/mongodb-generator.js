"use strict";

const _ = require("lodash");
const { Stack } = require("../lib");
const { isValidOperator } = require("../utils");

function mongoDBQueryGenerator(expression) {
  const stack = new Stack();
  for (const element of expression) {
    if (isValidOperator(element)) {
      const firstObject = stack.pop();
      const secondObject = stack.pop();
      switch (element) {
        case "OR":
          if (_.isUndefined(secondObject["$or"])) {
            stack.push({ $or: [firstObject, secondObject] });
          } else {
            secondObject["$or"].push(firstObject);
            stack.push(secondObject);
          }
          break;
        case "AND":
          if (_.isEmpty(secondObject["$and"])) {
            stack.push({ $and: [firstObject, secondObject] });
          } else {
            secondObject["$and"].push(firstObject);
            stack.push(secondObject);
          }
          break;
        default:
          throw new Error(`Invalid operator found : ${element}`);
      }
    } else {
      stack.push({ text: { $regex: element } });
    }
  }
  return stack.pop();
}

module.exports = { mongoDBQueryGenerator };
