class HashMap {
  constructor() {
    this.loadFactor = 0.75; // ratio between total Entries & total capacity, if it exceeds the that threshold we rearrange and grow our number of buckets
    this.indexer = [
      [],[],[],[],
      [],[],[],[],
      [],[],[],[],
      [],[],[],[],
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

  #add(key, value) {
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

  // set the keys and values
  set(key, value) {
    if (this.grow()) { // if the loadFactor exceeds
      let keys = this.keys(); // store the current keys
      let values = this.values(); // store the current values
      this.indexer = []; // empty the indexer
      for (let cap = 0; cap < this.capacity * 2; cap++) {
        this.indexer.push([]); // double the capacity
      }
      this.capacity = this.indexer.length; // update the capacity
      for (let i = 0; i < keys.length; i++) {
        this.#add(keys[i], values[i]); // add all the previous keys and values
      }
      this.#add(key, value); // add the new key and value
    } else {
      this.#add(key, value); // if the loadFactor doesn't exceed then keep adding
    }
  }

  // get value of a key
  get(key) {
    const k = this.#hash(key, this.capacity);
    let result = this.indexer[k].find((value) => value[0] == key)[1];
    return result;
  }
  // find out if a key exists in the hashmap
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
    return "Removed -> " + key;
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
    let values = [];
    this.entries().forEach((items) => {
      items.forEach((value) => {
        values.push(value[1]);
      });
    });
    return values;
  }

  // get a pretty output
  prettyPrint() {
    return JSON.stringify(this.entries(), null, 2);
  }

  // check occupied buckets
  entries() {
    return this.indexer.filter((items) => items.length > 0);
  }

  // check when to grow the capacity of buckets
  grow() {
    return (this.length() + 1) / this.capacity > this.loadFactor;
  }
}

// create a new hashmap instance
const test = new HashMap();

// add values to it
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
test.set("moon", "silver");

// let's test it out with the methods available to us
console.log(test.prettyPrint());
console.table(test.entries());
console.table(test.get("apple"));
console.table(test.has("apple"));
console.table(test.entries());
console.table(test.remove("apple"));
console.table(test.entries());
console.table(test.remove("lion"));
console.table(test.entries());
console.table(test.length());
console.table(test.keys());
console.table(test.values());
console.table(test.clear());
