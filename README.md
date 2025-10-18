### How the `KnightTavails` solution works
It's a BFS solution.

* `fucntion getKnightMoves(array)` >> `returns an array of all possible next moves within the bounds of 0-7`
* `fuction isMatched(current, target)` >>> `compares the current position to the target position` and `returns >> true or false based on whether they are the same`

---
`function` knightTravails(`start`, `target`)
- Checks whether the `target` and `start` are the same, if they are then they `return` >>>> `{moves: 0}, path:[]}`
- `Q` is our Queue instance
- `Q` initialized as -> `{pos: start}, path:[start]}` where `pos` is position, `path` is the container for all the nodes we traverse.
- `visited` keeps track of the visited `pos` which contains a set of visited `pos` as strings (so we can compare them easily)
---
- `WHILE (Q is not empty)`
    - `deque` first `pos` in the `queue`
    - `FOR every next move in getKnightMoves(pos)`
        - `IF next move is not visited`
            - create a `newPath` which contains all the current paths, and the `next` we just got.
            - `IF 'next move' is matching the target`
                - `return` >>>> `length of the newPath - 1` as total moves and `newPath` as all the position needed to get to the target.
            
            - `ELSE just add it to the set of visited nodes & put it in the Queue to explore it's next moves`

---

```javascript
    Q = [
            {
                pos: [i, j],
                path: [[i,j], .... [i, j]],
            },
            ...
            ...
            ...
        ]
    for next of [[new i, new j], [new i, new j], ....]; // all possible moves
    next = [new i, new j];
    newPath = [[i, j], .... [new i, new j]];
```