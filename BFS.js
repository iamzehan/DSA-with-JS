import Queue from "./utils/queue";

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