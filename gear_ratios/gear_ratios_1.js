const fs = require("fs");
// create array 'partNos' of possible part number objects
// [{ partNo : _ , rowPos : _ , colStart : _ , colEnd : _ }]
  // create array 'symbols' of symbol position objects
  // [{symbolRow : _ , symbolColumn : _ }]
fs.readFile("schematic.txt", (err, data) => {
  if (err) throw err;

  const lines = data.toString().split("\n"); // take data returned from file read and split into an array
  let partNos = []
  let symbols = []
  let grandTotal = 0
  // console.log("lines")
  // console.log(lines)
  for (let i = 0; i < lines.length; i++) {
    if (i == 30){
      console.log("before")
      console.log(lines[i] + "|")
    }
    const line = lines[i].replace(/(\r\n|\n|\r)/gm, ""); // remove carriage returns from line
    if (i == 30){
      console.log("after")
      console.log(line + "|")
    }
    // console.log("line")
    // console.log(line+"|")
    let recordingNumber = false
    let startPosition = 0
    for (let j = 0; j < line.length; j++){
      // if(i==44){
      //   console.log(line[j])
      // }
      // console.log("line[j]  -> " + line[j])
      // console.log("parseInt(line[j])" + parseInt(line[j]))
      if (line[j] === ".") {                          // NOT A SYMBOL OR NUMBER
        // console.log("not a number or a symbol")
        if (recordingNumber === true) {
          // end recording
          recordingNumber = false
          // add number to array
          let partNo = parseInt(line.substring(startPosition,j))
          partNos.push({ partNo: partNo, rowPos: i, colStart: startPosition, colEnd: j-1})
          grandTotal += partNo
        }
      } else if (isNaN(parseInt(line[j])) ) {          // MUST BE A SYMBOL
        // console.log("is a symbol")
        if (recordingNumber === true) {
          // end recording
          recordingNumber = false
          // add number to array
          let partNo = parseInt(line.substring(startPosition,j))
          partNos.push({ partNo: partNo, rowPos: i, colStart: startPosition, colEnd: j-1})
          grandTotal += partNo
        }
        // add symbol to array
        symbols.push({symbolChar: line[j] , symbolRow: i, symbolColumn: j})
        if(i==30){
          console.log(symbols[symbols.length-1])
        }
      } else {                                            // IS A NUMBER
        // console.log("is a number")
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
          let partNo = parseInt(line.substring(startPosition,j+1)) // TODO
          partNos.push({ partNo: partNo, rowPos: i, colStart: startPosition, colEnd: j})  // TODO
          grandTotal += partNo
        }
      }
    }
  }
  console.log("partNos = " + partNos.length)
  console.log(partNos)
  console.log("symbols = " + symbols.length)
  console.log(symbols)

  console.log("total part numbers="+partNos.length)
  // initialize sum = 0
  let sum = 0
  let sumExcluded = 0
  let countIncluded = 0
  let countExcluded = 0 
  // loop through partNos array
  for ( let i = 0; i < partNos.length; i++){
    let include = false
    const { partNo, rowPos, colStart, colEnd } = partNos[i]
    if (rowPos === 30 ){
      console.log("--> checking <-- " + partNo + " with rowPos " + rowPos)
    }
    //    loop through symbols
    for (let j = 0; j < symbols.length; j++){
      const { symbolRow, symbolColumn } = symbols[j]
      if ( symbolRow >= rowPos - 1 && symbolRow <= rowPos +1){
        if ( symbolColumn >= colStart -1 && symbolColumn <= colEnd +1){
          include = true
        }
      }
    }
    //    if include == true
    if(include){
      // console.log("including: "+partNo)
      sum += partNo;
      countIncluded ++
    } else {
      console.log("NOT: " + partNo + " on row "+ rowPos)
      countExcluded ++
      sumExcluded += partNo
    }
  }
  console.log("sum =" + sum )
  console.log("grandTotal =" + grandTotal )
  console.log("sumExcluded = " + sumExcluded)
  console.log("included = " + countIncluded)
  console.log("excluded = " + countExcluded)

})

//564267 /1117 is too high
// grand total of 627373 /1234
// total nots of 63106 / 117
// 760 symbols