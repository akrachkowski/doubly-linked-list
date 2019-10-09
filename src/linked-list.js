const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = new Node();
        this._tail = this._head;
    }

    // private
    tailNode() {
        let current = this._head;
        while (!!current.next) {
            current = current.next;
        }
        return current;
    }

    //private
    atNode(index) {
        let i = 0;
        let current = this._head;
        while (!!current.next && i < index) {
            current = current.next;
            i++;
        }
        return index === i ? current : null;
    }

    // private
    get length() {
        if (this.isEmpty()) {
            return 0;
        }
        let i = 1;
        let current = this._head;
        while (!!current.next) {
            current = current.next;
            i++;
        }
        return i;
    }

    append(data) {
        const tail = this.tailNode();
        if (!!tail.data) {
            tail.next = new Node(data, tail);
            this._tail = tail.next;
            return;
        }
        tail.data = data;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }


    at(index) {
        const node = this.atNode(index);
        return !!node && node.data;
    }

    insertAt(index, data) {
        const current = this.atNode(index);
        if (!current) {
            return;
        }
        const prev = current.prev;
        current.prev = new Node(data, prev, current);
    }

    isEmpty() {
        return !this._head.data;
    }

    clear() {
        this._head.next = null;
        this._head.data = null;
    }

    deleteAt(index) {
        const current = this.atNode(index);
        if (!current) {
            return;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;

        // current.next = null;
        // current.prev = null;
    }

    reverse() {
        this._head = this.tailNode();
        let current = this._head;
        while (!!current.prev) {
            current.next = current.prev;
            current = current.prev;
        }
        current.next = null;
    }

    indexOf(data) {
        let i = 0;
        let current = this._head;
        while (!!current.next) {
            if (current.data === data) {
                return i;
            }
            current = current.next;
            i++;
        }

        return current.data === data ? i : -1;
    }
}

module.exports = LinkedList;
