const fs = require("fs");

fs.readFile("data.txt", (err, data) => {
  let fileData = data.toString()
  fileData = fileData.replace(/(\r\n|\n|\r)/gm, "!"); // remove carriage returns from line
  fileData = fileData.replace(/ +/gm, " ")
  let dataLines = fileData.split('!')
  // console.log(dataLines)
  let winningNumbers = []
  let playedNumbers = []
  let cardCount = []
  for(let i = 0; i < dataLines.length; i++){
    winningNumbers.push(dataLines[i].split(": ")[1].split(" |")[0].split(" "))
    // console.log("W: " + winningNumbers[i])
    playedNumbers.push(dataLines[i].split("| ")[1].split(" "))
    // console.log("P: " + playedNumbers[i])
    cardCount.push(1)
  }
  for(let i = 0; i < dataLines.length; i++){
    // console.log("working on card #"+i)
    // console.log("there are "+cardCount[i]+" copies to process")
    for(let copy = 0; copy < cardCount[i]; copy ++){
      // console.log("Processing copy #"+ copy+" of card #"+ i)
      let winnings = 0
      let winningSet = new Set(winningNumbers[i])
      // console.log("WINNING SET")
      // console.log(winningSet)
      for (let j = 0; j < playedNumbers[i].length; j++){
        // console.log("comparing: "+playedNumbers[i][j])
        if ( winningSet.has(playedNumbers[i][j])){
          winnings ++
        }
      }
      // console.log("found "+winnings+" matches or wins on copy " + copy + " of card #" + i)
      // increase corresponding cardCount for each winnings
      for (let k=1; k  <= winnings; k++ ){
        if(k + i < dataLines.length ){
          cardCount[i+k] = cardCount[i+k] + 1
        }
      }
      // console.log("Done increasing card count based on winnings from card #"+i)
    }
  }
  console.log("Total Cards: " + cardCount.reduce((a,c) => a+c,0))
})