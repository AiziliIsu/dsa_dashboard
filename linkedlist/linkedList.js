class Node {
  constructor(head, data) {
    this.head = head;
    this.data = data;
    this.address = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  addFirst(data) {
    const newNode = new Node(true, data);
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.address = this.head;
      this.head = newNode;
    }
  }

  addLast(data) {
    const newNode = new Node(false, data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.address !== null) {
        current = current.address;
      }
      current.address = newNode;
    }
  }

  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.address;
    }
    return count;
  }

  addAt(index, data) {
    if (index < 0 || index > this.size()) {
      console.error("Invalid Index");
      return;
    }

    const newNode = new Node(false, data);

    if (index === 0) {
      newNode.address = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previous = current;
      current = current.address;
      currentIndex++;
    }

    newNode.address = current;
    previous.address = newNode;
  }

  removeTop() {
    if (!this.head) {
      return;
    }
    this.head = this.head.address;
  }

  removeLast() {
    if (!this.head) {
      return;
    }
    if (!this.head.address) {
      this.head = null;
      return;
    }
    let current = this.head;
    let previous = null;
    while (current.address) {
      previous = current;
      current = current.address;
    }
    previous.address = null;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      console.error("Invalid Index");
      return;
    }

    if (index === 0) {
      this.head = this.head.address;
      return;
    }

    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previous = current;
      current = current.address;
      currentIndex++;
    }

    previous.address = current.address;
  }

  print() {
    let current = this.head;
    let listString = '';
    while (current) {
      listString += current.data + ' ';
      current = current.address;
    }
    return listString.trim();
  }
}

const linkedlist = new LinkedList();

