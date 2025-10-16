class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.isEmpty() ? null : this.items.shift();
  }

  peek() {
    return this.isEmpty() ? "Queue is empty" : this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.join(" -> "));
  }
}
function bfs(graph, root) {
  let Q = new Queue();
  Q.enqueue(root);
  let searched = [];

  while (!Q.isEmpty()) {
    let person = Q.dequeue();
    if (person === null) break;
    if (person.split(" ")[1] === "M") {
      return person;
    }

    if (!searched.includes(person)) {
      (graph[person] || []).forEach(n=> {
        Q.enqueue(n);
      })
      searched.push(person);
    }
  }
  return false;
}
let graph = {};
graph["you"] = ["alice", "bob", "claire"];
graph["bob"] = ["anuj", "peggy"];
graph["alice"] = ["peggy"];
graph["claire"] = ["thom", "johnny M"];
graph["anuj"] = [];
graph["peggy"] = [];
graph["thom"] = [];
graph["johnny M"] = [];
console.log(bfs(graph, "you"));