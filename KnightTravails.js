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