const fs = require("fs");

fs.readFile("data.txt", (err, data) => { // ! must adjust entry points based on the tiles surrounding "S"
  if (err) throw err;
  // let rows = data.toString().split("\r\n"); // take data returned from file read and split into an array
  let rows = data.toString().split("\n"); // take data returned from file read and split into an array
  const grid = []
  let sRow
  let sCol
  for (let i = 0; i < rows.length; i++) {

    const row = [...rows[i]]
    grid[i] = row.filter(col => col !== "\n")
    if (row.includes("S")) {
      sRow = i
      sCol = row.findIndex(c => c==="S")
    }
  }
  console.log("Starting position:")
  console.log(sRow+","+sCol)

  const q = [[sRow,sCol,0]]
  const visited = new Set()

  // does main loop branch ? I don't think so.
  // do we need to check for in bounds?
  let maxDistance = 0
  let minR = Infinity
  let maxR = -1
  let step = 0
  while (q.length > 0  ) {
    step ++
    const [ r, c, distance] = q.shift()
    const pipeShape = grid[r][c]
    const pos = r + "," + c
    // console.log(pos + "  is " + distance + " away. -> " + pipeShape)
    if (!visited.has(pos)){
      visited.add(pos)
      maxDistance = Math.max(maxDistance, distance)
      minR = Math.min(r,minR)
      maxR = Math.max(r,maxR)
      if (pipeShape !== ".") {
        // left if "-" or "J" or "7"
        if (pipeShape === "-" || pipeShape === "J" || pipeShape ==="7" || pipeShape === "S") { // ! Adjust for "S" as needed
          q.push([r, c - 1, distance + 1])
        }
        // right if "-" or "L" or "F"
        if (pipeShape === "-" || pipeShape === "L" || pipeShape ==="F" ) {  // ! Adjust for "S" as needed
          q.push([r, c + 1, distance + 1])
        }
        // up if "|" or "J" or "L"
        if (pipeShape === "|" || pipeShape === "L" || pipeShape ==="J" ) { // ! Adjust for "S" as needed
          q.push([r - 1, c, distance + 1])
        }
        // down if "|" or "F" or "7"
        if (pipeShape === "|" || pipeShape === "F" || pipeShape ==="7" || pipeShape === "S") { // ! Adjust for "S" as needed
          q.push([r + 1, c, distance + 1])
        }
      }
    }
  }
  console.log( maxDistance)
})