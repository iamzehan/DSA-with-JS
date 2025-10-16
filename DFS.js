function dfs(data, start, visited=[], output = []){

    // add to the output if not visited before
    if(!visited.includes(start)){
        output.push(start);
    }
    // add to the visited
    visited.push(start);

    // take those neighbours except for the ones visited
    const neighbours = data[start].filter((i)=> {
        return !visited.includes(i);
    });
    // now apply dfs to the new neighbours
    for(neighbour of neighbours){
        return dfs(data,neighbour,visited, output);
    }
    return output.join("<-");
}

const data = {
  A: ["B"],
  B: ["A", "C", "D"],
  C: ["B", "E"],
  D: ["B", "E"],
  E: ["C", "D", "F"],
  F: ["E"],
};
console.log(dfs(data, 'D'));