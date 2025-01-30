const fs = require("fs");
// create array 'partNos' of possible part number objects
// [{ partNo : _ , rowPos : _ , colStart : _ , colEnd : _ }]
  // create array 'symbols' of symbol position objects
  // [{symbolChar: "_", symbolRow : _ , symbolColumn : _, adjacentPartNos: [] }]
fs.readFile("schematic.txt", (err, data) => {
  if (err) throw err;

  const lines = data.toString().split("\n"); // take data returned from file read and split into an array
  let partNos = []
  let symbols = []

  for (let i = 0; i < lines.length; i++) {

    const line = lines[i].replace(/(\r\n|\n|\r)/gm, ""); // remove carriage returns from line

    let recordingNumber = false
    let startPosition = 0
    for (let j = 0; j < line.length; j++){

      if (line[j] === ".") {                          // NOT A SYMBOL OR NUMBER
        if (recordingNumber === true) {
          // end recording
          recordingNumber = false
          // add number to array
          let partNo = parseInt(line.substring(startPosition,j))
          partNos.push({ partNo: partNo, rowPos: i, colStart: startPosition, colEnd: j-1})
        }
      } else if (isNaN(parseInt(line[j])) ) {          // MUST BE A SYMBOL
        if (recordingNumber === true) {
          // end recording
          recordingNumber = false
          // add number to array
          let partNo = parseInt(line.substring(startPosition,j))
          partNos.push({ partNo: partNo, rowPos: i, colStart: startPosition, colEnd: j-1})
        }
        // add symbol to array
        symbols.push({symbolChar: line[j] , symbolRow: i, symbolColumn: j, adjacentPartNos: []})
      } else {                                            // IS A NUMBER
        if (recordingNumber === true) {
          // continue recording
        } else {
          // start recording
          recordingNumber = true
          startPosition = j
        }
        if (j === line.length-1) { // row ends on a number
          // end recording
          recordingNumber = false // <- probably unneeded here
          // add number to array
          let partNo = parseInt(line.substring(startPosition,j+1))
          partNos.push({ partNo: partNo, rowPos: i, colStart: startPosition, colEnd: j})
        }
      }
    }
  }
  // console.log("partNos = " + partNos.length)
  // console.log(partNos)
  console.log("symbols = " + symbols.length)
  console.log(symbols)
  
  console.log("total part numbers="+partNos.length)
  let sum = 0
  // let sumExcluded = 0
  // let countIncluded = 0
  // let countExcluded = 0 
  // loop through partNos array
  for ( let i = 0; i < partNos.length; i++){
    // let include = false
    const { partNo, rowPos, colStart, colEnd } = partNos[i]
    //    loop through symbols
    for (let j = 0; j < symbols.length; j++){
      const { symbolChar, symbolRow, symbolColumn, adjacentPartNos } = symbols[j]
      if ( symbolRow >= rowPos - 1 && symbolRow <= rowPos +1){
        if ( symbolColumn >= colStart -1 && symbolColumn <= colEnd +1){
          if(symbolChar === "*"){
            if(!symbols[j].adjacentPartNos.includes(partNo)){
              symbols[j].adjacentPartNos.push(partNo)
            }
          }
        }
      }
    }
    // if(include){          // This one gets included
    //   sum += partNo;
    //   countIncluded ++
    // } else {              // This one get excluded
    //   countExcluded ++
    //   sumExcluded += partNo
    // }
  }

  // Gears should be added, now calculate them
  
  for (let i = 0; i < symbols.length; i++){
    const { symbolChar, symbolRow, symbolColumn, adjacentPartNos } = symbols[i]
    if (symbolChar === "*" && adjacentPartNos.length === 2){
      sum += adjacentPartNos[0]*adjacentPartNos[1]
    }
  }
  console.log("sum =" + sum )
  // console.log("sumExcluded = " + sumExcluded)
  // console.log("included = " + countIncluded)
  // console.log("excluded = " + countExcluded)
  // console.log("symbols = " + symbols.length)
  // console.log(symbols)
  
})
