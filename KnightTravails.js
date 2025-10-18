/* For this project we will use a graph

- What is a graph?

- Made up of vertices and edges
- Vertices are the data and the edges are the lines that 
connect those data
- Basically, a graph is a representation of network
- Each pair is represented by (v, u) respectively vertices and 
  undirected edges.
- Vertices that are connected by an edge are called adjacent or neighbours
- Number of edges connected to a vertex are called degree of the vertices.
- When a path from a vertex makes a full circle to itself is called a cycle.
- We can put numeric values to edges. Those are called weights.
- Graphs with weighted edges are called a weighted graph.
- Graphs can be directed. That means they can go one way or both ways.
- A directed graph can only be travered according to the direction.
- A directed graph with no cycles are called acyclic graph or dag.
- We can also have weighted directed graphs. e.g. road maps with one way streets
  and distances.
- We describe the weighted graphs as leaving one vertex (u), entering another (v)  
which amounts to (u->v)
- The number of edges leaving a vertex is called it's out-degree, and the number
  of edges entering is the in-degree. 
- Working with graphs we say the set of vertices are V, and set of edges are E.
*/

/*
                                How a knight moves
------------------------------------------------------------------------------------
                        chessBoard = [
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                            
- One step forward, and two steps to the sides (left or right)
- Two steps forward, and one step to the side (left or right)


So, given chessBoard[i][j] position of the Knight currently, all the possible moves
are - 

- chessBoard[i+1][j+2] -> one step forward two steps to the right
- chessBoard[i+1][j-2] -> one step forward two steps to the left
- chessBoard[i+2][j-1] -> two step to the side one step to the left
- chessBoard[i+2][j+1] -> two step to the side one step to the right
- chessBoard[i-1][j+2] → one step backward, two right
- chessBoard[i-1][j-2] → one step backward, two left
- chessBoard[i-2][j+1] → two left, one forward
- chessBoard[i-2][j-1] → two left, one backward
------------------------------------------------------------------------------------

Notes: 
- Each square on the board is a node (vertex)
- Every possible move is considered an edge.
- Thus finding the shortest path becomes a graph traversal problem.

Goal: 
- Finding the shortest route between two nodes.

Tip: 
- Represent the positions as coordinates -> 0<=i<=7 and 0<=j<=7 
- Use a queue to keep track of next positions to explore (like in tree BFS)
- Track the visited positions.

Task: 
- build a knightMoves function that shows shortest possible ways to get from one square
to another by outputting all squares the knight will stop on along the way.
*/

import Queue from "./utils/queue.js";

// let's create a helper function that will return an array of possible next moves
function getKnightMoves([i, j]) {
  const moves = [
    [i + 2, j + 1],
    [i + 2, j - 1],
    [i - 2, j + 1],
    [i - 2, j - 1],
    [i + 1, j + 2],
    [i + 1, j - 2],
    [i - 1, j + 2],
    [i - 1, j - 2],
  ];
  return moves.filter(([p, q]) => p >= 0 && p < 8 && q >= 0 && q < 8);
}

// let's create another helper function that tells us whether a target is matched to the next move
function isMatched(current, target) {
  return current[0] === target[0] && current[1] === target[1];
}

function knightMoves(start, target) {
  // if the target is the same as the start
  if (isMatched(start, target)) return { moves: 0, path: [start] };
  // create a queue
  const Q = new Queue();
  // initialize the position and the path
  Q.enqueue({ pos: start, path: [start] });
  // the visited path 
  const visited = new Set([start.toString()]);

  while (!Q.isEmpty()) {
    // pick the first path and position
    const { pos, path } = Q.dequeue();
    // iterate through it's next possible moves
    for (const next of getKnightMoves(pos)) {
      // if the next path wasn't visited before
      if (!visited.has(next.toString())) {
        // add the next path to existing path and call it a new path
        const newPath = [...path, next];
        // if the next move matches to the current
        if (isMatched(next, target)) {
          // return number of all moves and the latest updated path
          const result = { moves: newPath.length - 1, path: newPath };
          return `You got there in ${result.moves} moves.\nYour path is >>\n${result.path.join(" >>-> ")}`
        }
        // add the next path to visited
        visited.add(next.toString());
        // push the next position and path to the queue
        Q.enqueue({ pos: next, path: newPath });
      }
    }
  }
  // might not happen ever
  return { moves: -1, path: [] }; 
}

// let's call the knightMoves
console.log(knightMoves([3, 3], [4, 3]));