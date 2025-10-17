// We are about to create  a binary search tree
// There is a root node where it begins
// There are parent-child nodes
// nodes with no children are called leaf nodes
// We are also aware of the BFS and DFS at this point
// It's supposed to be easy now, so let's go!

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  #array;
  constructor(array) {
    // remove duplicates and sort the array
    this.#array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.#buildTree(this.#array);
  }

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

  prettyPrint = (node=this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`\n${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  insert(key, root=this.root){
    if(root === null){
        return new Node(key);
    }

    if (key < root.data){
        root.left = this.insert(key, root.left);
    }
    else{
        root.right = this.insert(key, root.right);
    }
    this.root = root;
    return this.root;
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
// console.log(JSON.stringify(tree, null, 2));
console.log(tree.pretty);
console.log(JSON.stringify(tree.insert(40), null, 2));
console.log(tree.prettyPrint());
