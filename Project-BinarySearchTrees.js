// We are about to create  a binary search tree
// There is a root node where it begins
// There are parent-child nodes
// nodes with no children are called leaf nodes
// We are also aware of the BFS and DFS at this point
// It's supposed to be easy now, so let's go!

/* The class Node represents a node in a binary tree with data, left, and right properties. */

import Queue from "./utils/queue.js";
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
/* The Tree class removes duplicates and sorts an array to build a tree structure. */
class Tree {
  #array;
  constructor(array) {
    // remove duplicates and sort the array
    this.#array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.#buildTree(this.#array);
  }

  /* The `#buildTree` method in the `Tree` class is a private method that recursively constructs a binary
search tree from a sorted array of unique values. Here's a breakdown of what the method does: */
  #buildTree = (array) => {
    // base case
    if (array.length === 0) return null;

    // middle element is the root
    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);

    // from start to the previous element of the root are left nodes
    root.left = this.#buildTree(array.slice(0, mid));
    // from the next element of the root are considered right nodes
    root.right = this.#buildTree(array.slice(mid + 1));

    return root;
  };

  /* The `prettyPrint` function in the code is a method of the `Tree` class. It is a recursive function
that helps in visually displaying the binary search tree in a structured and readable format. Here's
a breakdown of what the `prettyPrint` function does: */
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`\n${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  /**
   * The insert function recursively inserts a new node with a given key into a binary search tree.
   * @param key - The `key` parameter represents the value that you want to insert into the binary search
   * tree.
   * @param [root] - The `root` parameter in the `insert` function represents the root node of a binary
   * search tree where the `key` needs to be inserted. If the `root` is `null`, it means the tree is
   * empty, and a new node with the `key` value will be created as
   * @returns The `insert` method is returning the updated root node of the binary search tree after
   * inserting the new key.
   */
  insert(key, root = this.root) {
    if (root === null) {
      return new Node(key);
    }
    if (key < root.data) {
      root.left = this.insert(key, root.left);
    } else {
      root.right = this.insert(key, root.right);
    }
    this.root = root;
    return this.root;
  }

  // #getSuccessor() finds the next smallest value greater than the node being deleted.
  #getSuccessor(currentNode) {
    // Go one step to the right of the node you’re deleting.
    currentNode = currentNode.right;
    // Then go as far left as possible — that gives you the smallest value in that right subtree.
    while (currentNode !== null && currentNode.left != null)
      currentNode = currentNode.left;
    // Return that node — it’s the “successor.”
    return currentNode;
  }
  /**
   * The function `delete` in JavaScript is used to remove a node from a binary search tree by finding
   * the node to delete based on its key and handling different cases such as having 0, 1, or 2
   * children.
   * @param key - The `key` parameter in the `delete` function represents the value that you want to
   * remove from the binary search tree. When you call the `delete` function with a specific key, it
   * will search for that key in the tree and remove the node containing that key while maintaining the
   * binary search tree
   * @param [root] - The `root` parameter in the `delete` function represents the root node of a binary
   * search tree (BST) where you want to delete a node with a specific key. The function recursively
   * searches for the node with the given key in the BST starting from the root node. If the key is
   * found
   * @returns The `delete` method is returning the updated root node of the binary search tree after
   * deleting the node with the specified key.
   */
  delete(key, root = this.root) {
    if (root == null) {
      return root;
    }
    // If key is smaller, look in the left subtree.
    if (root.data > key) {
      root.left = this.delete(key, root.left);
    }
    // If key is larger, look in the right subtree.
    else if (root.data < key) {
      root.right = this.delete(key, root.right);
    }
    // If it matches → we found the node to delete.
    else {
      // Node with 0 or 1 child
      // if left child doesn't exist
      if (root.left == null) {
        // return right child
        return root.right;
      }
      // if the right child doesn't exist
      else if (root.right == null) {
        // return left child.
        return root.left;
      }
      // If Node has 2 children
      // 1. Find in order successor
      const successor = this.#getSuccessor(root);
      // 2. Copy its value into the current node (overwrite root.data).
      root.data = successor.data;
      // 3. Delete that successor node from the right subtree (it’s a duplicate now).
      root.right = this.delete(successor.data, root.right);
    }
    return root;
  }

  find(key, root = this.root) {
    if (root === null) {
      return "Not found";
    }
    if (root.data == key) {
      return root;
    }
    // If key is smaller, look in the left subtree.
    if (root.data > key) {
      return this.find(key, root.left);
    }
    // If key is larger, look in the right subtree.
    else if (root.data < key) {
      return this.find(key, root.right);
    }
  }

  levelOrderForEach(callbackNode) {
    if (typeof callbackNode !== "function") {
      throw new Error(
        "A callback function is required for levelOrderForEach()."
      );
    }
    if (this.root == null) {
      return;
    }
    const Q = new Queue();
    Q.enqueue(this.root);

    while (!Q.isEmpty()) {
      let currentNode = Q.dequeue();
      callbackNode(currentNode.data);
      if (currentNode.left != null) {
        Q.enqueue(currentNode.left);
      }
      if (currentNode.right != null) {
        Q.enqueue(currentNode.right);
      }
    }
  }

  preOrderForEach(callback, root = this.root) {
    if (root == null) return;
    callback(root.data);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }
  inOrderForEach(callback, root = this.root) {
    if (root == null) return;
    this.inOrderForEach(callback, root.left);
    callback(root.data);
    this.inOrderForEach(callback, root.right);
  }
  postOrderForEach(callback, root = this.root) {
    if (root == null) return;
    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.data);
  }

  height(key, root = this.root, height=0) {
    if (root === null) {
      return 0;
    }
    if (root.data == key) {
      return height;
    }
    // If key is smaller, look in the left subtree.
    if (root.data > key) {
      return this.height(key, root.left, height+1);
    }
    // If key is larger, look in the right subtree.
    else if (root.data < key) {
      return this.height(key, root.right, height+1);
    }
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
// console.log(JSON.stringify(tree, null, 2));
// console.log(tree.pretty);
// console.log(JSON.stringify(tree.insert(40), null, 2));
console.log(tree.prettyPrint());
// console.log(tree.delete(6345));
// console.log(tree.prettyPrint());
// tree.prettyPrint(tree.find(67));
// console.log(tree.find(8));
// tree.levelOrderForEach(node=> {
//   console.log(node);
// });

// tree.inOrderForEach((node) => {
//   console.log(node);
// });

console.log(tree.height(9));