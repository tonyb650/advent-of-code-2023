const fs = require("fs");

fs.readFile("data.txt", (err, data) => {
  if (err) throw err;

  let rows = data.toString().split("\r\n"); // take data returned from file read and split into an array
  let instructions = rows[0]
  rows = rows.slice(2)

  // LOAD MAP
  let desertMap = new Map()
  for (let i = 0; i < rows.length; i++ ){
    const [from , to] = rows[i].split(" = (")
    const [left, rightRaw] = to.split(", ")
    const right = rightRaw.split(")")[0]
    desertMap.set(from, [left, right])
  } 
  
  // FIND FIRST GROUP OF NODES
  let nodeGroup = []
  let turnsCount = []
  for (const node of desertMap) {
    if (node[0][2] === "A") {
      nodeGroup.push(node[0])
      turnsCount.push(0)
    }
  }
  console.log(nodeGroup)
  
  // FIND TURN COUNT TO "Z" FOR EACH NODE IN THE GROUP 
  let turns = 0
  let index = 0
  while (turnsCount.includes(0) ) {
    turns ++
    final = true
    if (index >= instructions.length) index = 0
    let direction = instructions[index]
    
    for (let i = 0; i < nodeGroup.length ; i++) {
      const toAdd = direction === "L" ? desertMap.get(nodeGroup[i])[0] : desertMap.get(nodeGroup[i])[1]
      nodeGroup[i] = toAdd
      if (toAdd[2] === "Z" && turnsCount[i] === 0) 
        turnsCount[i] = turns
    }
    index ++
  }
  console.log(turnsCount)

  // CALCULATE THE LEAST COMMON MULTIPLE
  // https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm/49722579#49722579
  console.log("calculating LCM")
  const gcd = (a, b) => a ? gcd(b % a, a) : b; // greatest common divisor
  const lcm = (a, b) => a * b / gcd(a, b);
  console.log( turnsCount.reduce(lcm));
  console.log( turnsCount.reduce(lcm).toString().length); // 14 DIGITS LONG
  return
  
  // My naive approach to LCM, would probably take years // 1-2 MINUTES TO GET TO 10 DIGITS
  turns = 0 
  flag = false
  while (!flag) {
    // console.log(turns)
    turns += turnsCount[0]
    console.log(turns.toString().length)
    flag = true
    for (const node of turnsCount) {
      if (node % turns !== 0) {
        flag = false
      }
    }
  }
  console.log(turns) 
})