class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(value) {
    let newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }

    let currentNode = this.headNode;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = newNode;
  }
  prepend(value) {
    let newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      return;
    } else {
      newNode.nextNode = this.headNode;
      this.headNode = newNode;
    }
  }
  size() {
    let count = 0;
    let currentNode = this.headNode;
    while (currentNode) {
      count += 1;
      currentNode = currentNode.nextNode;
    }
    return count;
  }
  tail() {
    let currentNode = this.headNode;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  head() {
    return this.headNode;
  }
  // insert at a certain index
  insertAt(value, index) {
    let newNode = new Node(value);
    let currentNode = this.headNode;
    let idx = 0;

    if (index === 0) {
      if (!this.headNode) {
        this.headNode = this.newNode;
        return;
      } else {
        newNode.nextNode = this.headNode;
        this.headNode = newNode;
      }
    }

      while (currentNode && idx + 1 != index) {
        idx += 1;
        currentNode = currentNode.nextNode;
      }
      if (currentNode) {
        try{
        newNode.nextNode = currentNode.nextNode;
        currentNode.nextNode = newNode;
        }catch(error){
            return error;
        }
      }
      else{
        return "Index not found";
      }
    }
  // remove at a certain index
  removeAt(index) {
    if (index === 0) {
      this.headNode = this.headNode.nextNode;
      return;
    }

    let idx = 0;
    let currentNode = this.headNode;
    while (currentNode && idx + 1 != index) {
      idx += 1;
      currentNode = currentNode.nextNode;
    }
    if (currentNode) {
      try {
        currentNode.nextNode = currentNode.nextNode.nextNode;
      } catch (error) {
        return error;
      }
    } else {
      return "Index doesn't exist";
    }
  }
  // pop or remove from the end of the linked list
  pop() {
    if (this.headNode == null) {
      return;
    }
    let currentNode = this.headNode;
    while (currentNode.nextNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = null;
  }
  // add a node at the end of the linked list
  push(value) {
    if (this.headNode == null) {
      this.headNode = new Node(value);
      return this.headNode;
    }
    let currentNode = this.headNode;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = new Node(value);
  }
  // find node of a given index
  at(index) {
    if (index === 0 && this.headNode) {
      return this.headNode;
    }

    let idx = 0;
    let currentNode = this.headNode;
    while (currentNode && idx + 1 != index) {
      idx += 1;
      currentNode = currentNode.nextNode;
    }
    return currentNode.nextNode;
  }
  // find index of a given value
  find(value) {
    let idx = 0;
    let currentNode = this.headNode;
    while (currentNode && currentNode.value != value) {
      idx += 1;
      currentNode = currentNode.nextNode;
    }
    if (currentNode) {
      return idx;
    } else {
      return "Index not found";
    }
  }

  contains(value) {
    let currentNode = this.headNode;
    while (currentNode.nextNode && currentNode.value != value) {
      currentNode = currentNode.nextNode;
    }
    return currentNode.value == value;
  }
  toString() {
    let string = "";
    let currentNode = this.headNode;
    while (currentNode.nextNode) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    string += `( ${currentNode.value} ) -> null`;
    return string;
  }
}
// const LL = new LinkedList();

// for (let i = 1; i < 10; i++) {
//   LL.append(i);
// }

// console.log('initial:', LL.toString());

// // size()
// console.log('size():', LL.size(), '->', LL.toString());

// // prepend
// LL.prepend(0);
// console.log('after prepend(0):', LL.size(), '->', LL.toString());

// // head and tail
// console.log('head():', LL.head() ? LL.head().value : null, '->', LL.toString());
// console.log('tail():', LL.tail() ? LL.tail().value : null, '->', LL.toString());

// // insertAt
// console.log('insertAt(99,5):', LL.insertAt(99, 5), '->', LL.toString());

// // at
// const nodeAt5 = LL.at(5);
// console.log('at(5):', nodeAt5 ? nodeAt5.value : null, '->', LL.toString());

// // find
// console.log('find(99):', LL.find(99), '->', LL.toString());

// // contains
// console.log('contains(99):', LL.contains(99), '->', LL.toString());
// console.log('contains(123):', LL.contains(123), '->', LL.toString());

// // push (alias of append)
// LL.push(10);
// console.log('after push(10):', LL.size(), '->', LL.toString());

// // pop
// console.log('pop():', LL.pop(), '->', LL.toString());

// // removeAt
// console.log('removeAt(5):', LL.removeAt(5), '->', LL.toString());

// // final state
// console.log('final size():', LL.size(), '->', LL.toString());

export default LinkedList;