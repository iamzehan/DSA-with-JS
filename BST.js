// Balanced Binary Search Tree (BST)
// The difference between the heights of the left and right subtrees are gonna be at most one
// The idea is to build a tree from a sorted array

import Node from "./utils/treeNode.js";

const treeBuilder = (arr, start, end) => {
    if(start>end) return null;
    
    // middle element is the root
    let mid = start + Math.floor((end - start)/2);
    let root = new Node(arr[mid]);
    
    // from start to the previous element of the root are left nodes
    root.left = treeBuilder(arr, start, mid-1);
    // from the next element of the root are considered right nodes
    root.right = treeBuilder(arr, mid+1, end);

    return root;
}

// function which will return the BST
function sortedArrayToBST(arr){
    return treeBuilder(arr, 0, arr.length - 1);
}

// our sorted array

const arr = [1, 5, 9, 14, 23, 27];

console.log(JSON.stringify(sortedArrayToBST(arr), null, 2));