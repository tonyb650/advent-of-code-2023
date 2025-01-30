const fs = require("fs");
// create array 'partNos' of possible part number objects
// [{ partNo : _ , rowPos : _ , colStart : _ , colEnd : _ }]
  // create array 'symbols' of symbol position objects
  // [{symbolRow : _ , symbolColumn : _ }]
fs.readFile("schematic.txt", (err, data) => {
  if (err) throw err;
  let numbers = []
  const allData = data.toString(); // take data returned from file read and split into an array
  let recording = false
  startPos = null
  let symbolCount = 0
  let grandTotal = 0
  for (let i=0; i<allData.length; i++){
    // if (i<500){
    //   console.log(allData[i])
    // }
    if(parseInt(allData[i])>0 || allData[i] == "0"){
      if (!recording) {           // start of a number
        startPos = i
        recording = true
      }
    } else if (recording == true) { // first character after a number ends
      numbers.push(parseInt(allData.substring(startPos,i)))
      grandTotal += parseInt(allData.substring(startPos,i))
      recording = false
    }
    if (allData[i] != "." && allData[i] != "0" && allData[i] != "1" && allData[i] != "2" && allData[i] != "3" && allData[i] != "4" && allData[i] != "5" && allData[i] != "6" && allData[i] != "7" && allData[i] != "8" && allData[i] != "9"  && allData[i] != "\r"  && allData[i] != "r"  && allData[i] != "\n"){
      symbolCount++;
    }
  }
  console.log( numbers )
  console.log( grandTotal )
  console.log( "count: "+ numbers.length ) // 1234
  console.log("symbolCount: "+ symbolCount) // 760

})

