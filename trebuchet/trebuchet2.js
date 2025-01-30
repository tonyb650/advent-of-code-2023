const fs = require("fs");

const digits = {
  0:0,
  zero:0,
  1: 1,
  one: 1,
  2: 2,
  two: 2,
  3: 3,
  three: 3,
  4: 4,
  four: 4,
  5: 5,
  five: 5,
  6: 6,
  six: 6,
  7: 7,
  seven: 7,
  8: 8,
  eight: 8,
  9: 9,
  nine: 9,
};

fs.readFile("data.txt", (err, data) => {
  if (err) throw err;
  let textLines = data.toString().split("\n");
  let sum = 0;
  for (let i = 0; i < textLines.length; i++){
    let line = textLines[i];
    let lineDigits = [];
    for (let j = 0; j < line.length; j++) {
      for (const digitEntry in digits) {
        if (
          j + digitEntry.length-1 < line.length &&
          line.substring(j, j + digitEntry.length) == digitEntry
        ) {
          lineDigits.push(digits[digitEntry]);
          // j += digitEntry.length - 1; // <-- This was the line that messed it up! :( 'oneight'
        }
      }
    }
    if (i > 950 || i < 20){
      console.log("-----------------")
      console.log("line: "+ line);
      console.log("lineDigits")
      console.log(lineDigits)
      console.log("adding: " + (lineDigits[0]*10 + lineDigits[lineDigits.length-1]))
    }
    // console.log(lineDigits);
    sum += lineDigits[0]*10
    sum += lineDigits[lineDigits.length-1]
    if (i > 950 || i <20){
      console.log("i="+i+"  sum"+sum)
    }
  }
  console.log(sum);
});
