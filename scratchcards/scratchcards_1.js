const fs = require("fs");

fs.readFile("data.txt", (err, data) => {
  let fileData = data.toString()
  fileData = fileData.replace(/(\r\n|\n|\r)/gm, "!"); // remove carriage returns from line
  fileData = fileData.replace(/ +/gm, " ")
  let dataLines = fileData.split('!')

  let winningNumbers = []
  let playedNumbers = []
  for(let i = 0; i < dataLines.length; i++){
    winningNumbers.push(dataLines[i].split(": ")[1].split(" |")[0].split(" "))
    // console.log("W: " + winningNumbers[i])
    playedNumbers.push(dataLines[i].split("| ")[1].split(" "))
    // console.log("P: " + playedNumbers[i])
  }
  let sum = 0
  for(let i = 0; i < dataLines.length; i++){
    let winnings = 0
    let winningSet = new Set(winningNumbers[i])
    // console.log("WINNING SET")
    // console.log(winningSet)
    for (let j = 0; j < playedNumbers[i].length; j++){
      // console.log("comparing: "+playedNumbers[i][j])
      if ( winningSet.has(playedNumbers[i][j])){
        if (winnings === 0) {
          winnings = 1
        } else {
          winnings *= 2
        }
      }
    }
    // console.log("Adding winnings of: " + winnings+ " at i= "+i)
    sum += winnings
  }
  console.log(sum)
})