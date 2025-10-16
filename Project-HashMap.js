import LinkedList from "./LinkedList.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.indexer = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],   // 16 initial buckets
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    this.capacity = this.indexer.length;
  }

  // our private method of hashing, 
  // we made it inaccessible outside of this class
  #hash(key, len) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % len;
    }

    return hashCode;
  }
  // set the keys and values
  set(key, value) {
    // check if we should grow our bucket size
    this.grow();
    const k = this.#hash(key, this.capacity);
    if (this.indexer[k].length == 0) {
      this.indexer[k].push([key, value]);
    } else {
      let newValue = false;
      this.indexer[k].forEach((items) => {
        if (items[0] == key) {
          items[1] = value; // replaces existing value with the new one
        } else {
          newValue = true;
        }
      });
      if (newValue) {
        this.indexer[k].push([key, value]);
      }
    }
  }
  // get value of a key
  get(key) {
    const k = this.#hash(key, this.capacity);
    let result = this.indexer[k].find((value) => value[0] == key)[1];
    return result;
  }
  // see if a key exists in the hashmap
  has(key) {
    const k = this.#hash(key, this.capacity);
    let result = this.indexer[k].find((value) => value[0] == key);
    return result ? true : false;
  }
  // remove an entry based on it's key
  remove(key) {
    const k = this.#hash(key, this.capacity);
    this.indexer[k].forEach((value, idx) => {
      if (value[0] == key) {
        this.indexer[k].splice(idx, 1);
      }
    });

    return this.entries();
  }
  // get the number of stored keys in the hashmap
  length() {
    let length = 0;
    this.entries().forEach((items) => {
      length += items.length;
    });
    return length;
  }
  // clear the whole thing
  clear() {
    return (this.indexer = new HashMap().indexer);
  }

  // get the list of stored keys
  keys() {
    let keys = [];
    this.entries().forEach((items) => {
      items.forEach((value) => {
        keys.push(value[0]);
      });
    });
    return keys;
  }

  // get the list of stored values
  values() {
    let keys = [];
    this.entries().forEach((items) => {
      items.forEach((value) => {
        keys.push(value[1]);
      });
    });
    return keys;
  }

  // get a pretty output
  prettyPrint() {
    return JSON.stringify(this.entries(), null, 2);
  }

  entries() {
    return this.indexer.filter((items) => items.length > 0);
  }

  // check when to grow the capacity of buckets
  grow() {
    if (this.entries().length > this.loadFactor * this.capacity) {
      for (let cap = 0; cap < this.capacity; c++) {
        this.indexer.push([]);
      }
    }
    this.capacity = this.indexer.length;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("dog", "golden");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.entries());
// console.log(test.get("apple"));
// console.log(test.has("apple"));
// console.log(test.remove("apple"));
// console.log(test.remove("lion"));
// console.log(test.length());
// console.log(test.clear());
// console.log(test.keys());
// console.log(test.values());