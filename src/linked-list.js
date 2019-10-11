const Node = require('./node');

class LinkedList {
  constructor() {
    this._head;
    this._tail;
  }

  get length() {
    const { index } = goToIndexOrEnd(this._head);
    return index + 1;
  }

  append(data) {
    if (!this._head) {
      this._head = new Node(data);
      this._tail = this._head;

      return this;
    }

    const oldTail = this._tail;
    this._tail = new Node(data, oldTail);
    oldTail.next = this._tail;

    return this;
  }

  head() {
    return this._head && this._head.data;
  }

  tail() {
    return this._tail && this._tail.data;
  }

  at(index) {
    const { node } = goToIndexOrEnd(this._head, index);

    return node && node.data;
  }

  insertAt(index, data) {
    const { node } = goToIndexOrEnd(this._head, index);

    if (!node) {
      return this;
    }

    const newNode = new Node(data, node.prev, node);
    node.prev.next = newNode;
    node.prev = newNode;

    if (node === this._head) {
      this._head = newNode;
    }

    return this;
  }

  isEmpty() {
    return !this._head;
  }

  clear() {
    this._head = null;
    this._tail = null;

    return this;
  }

  deleteAt(index) {
    const { node } = goToIndexOrEnd(this._head, index);

    if (!node) {
      return this;
    }

    const prev = node.prev;
    const next = node.next;

    if (!!prev) {
      prev.next = next;
    }

    if (!!next) {
      next.prev = prev;
    }

    if (node === this._head) {
      this._head = next;
    }

    if (node === this._tail) {
      this._tail = prev;
    }

    node.prev = null;
    node.next = null;
    node.data = null;

    return this;
  }

  reverse() {
    if (this.isEmpty()) {
      return this;
    }

    let current = this._head;
    while (!!current) {
      const next = current.next;
      current.next = current.prev;
      current.prev = current;
      current = next;
    }

    const head = this._head;
    this._head = this._tail;
    this._tail = head;

    return this;
  }

  indexOf(data) {
    if (this.isEmpty()) {
      return -1;
    }

    let i = 0;
    let current = this._head;
    while (!!current) {
      if (current.data === data) {
        return i;
      }
      current = current.next;
      i++;
    }

    return -1;
  }
}

module.exports = LinkedList;

const goToIndexOrEnd = (head, index = -1) => {
  if (!head) {
    return {
      node: null,
      index: -1
    };
  }

  let i = 0;
  let current = head;
  while (current.next && i !== index) {
    current = current.next;
    i++;
  }

  return {
    node: current,
    index: i
  };
}; 