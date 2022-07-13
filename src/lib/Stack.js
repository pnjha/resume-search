class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.items.length == 0) {
      return "Underflow";
    }
    return this.items.pop();
  }
  empty() {
    return this.items.length == 0;
  }
  top() {
    return this.items[this.items.length - 1];
  }
}

module.exports = Stack;
