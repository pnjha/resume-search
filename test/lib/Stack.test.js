"use strict";

const { Stack } = require("../../src/lib");

describe("Stack test", () => {
  test("should return true if stack is empty", () => {
    const stack = new Stack();
    expect(stack.empty()).toBeTruthy();
    stack.push("dummy");
    expect(stack.empty()).toBeFalsy();
    stack.pop();
    expect(stack.empty()).toBeTruthy();
  });
  test("should return and remove top element when stack is poped", () => {
    const stack = new Stack();
    stack.push("dummy1");
    stack.push("dummy2");
    expect(stack.top()).toEqual("dummy2");
    const element = stack.pop();
    expect(element).toEqual("dummy2");
    expect(stack.top()).toEqual("dummy1");
  });
  test("should return underflow when popping from empty stack", () => {
    const stack = new Stack();
    expect(stack.pop()).toEqual("Underflow");
  });
});
