const fs = require("fs");

fs.readFile("data.txt", (err, data) => {
  if (err) throw err;

  let rows = data.toString().split("\r\n"); // take data returned from file read and split into an array
  let instructions = rows[0]
  rows = rows.slice(2)
  // console.log(instructions)
  // console.log(rows)

  // LOAD MAP
  let desertMap = new Map()
  for (let i = 0; i < rows.length; i++ ){
    const [from , to] = rows[i].split(" = (")
    const [left, rightRaw] = to.split(", ")
    const right = rightRaw.split(")")[0]
    desertMap.set(from, [left, right])
  } 
  console.log(desertMap)
  console.log(instructions[0])

  // NAVIGATE
  let turns = 0
  let index = 0
  let comingFrom = "AAA"
  while (comingFrom !== "ZZZ") {
    if (index >= instructions.length) index = 0
    let direction = instructions[index]
    comingFrom = direction === "L" ? desertMap.get(comingFrom)[0] : desertMap.get(comingFrom)[1]
    turns ++
    index ++
  }
  console.log(turns) 
})