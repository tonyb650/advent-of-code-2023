const fs = require("fs");
const possibleCubesOfColor = {
  red : 12,
  green: 13,
  blue: 14
}
fs.readFile("games.txt", (err, data) => {
  if (err) throw err;

  // helper function
  const maxCubesOfColor = (gameString, color) => {
    let splitOnColor = gameString.split(" "+color)
    for( let i = 0; i < splitOnColor.length; i++){
      let splitOnSpace = splitOnColor[i].split(" ")
      let cubesOfThisColor = splitOnSpace[splitOnSpace.length-1]
      if ( cubesOfThisColor > possibleCubesOfColor[color]) {
        return false
      }
    }
    return true
  }
  // initialize variables and data array
  let sum = 0;
  let textLines = data.toString().split("\n"); // take data returned from file read and split into an array

  // main loop
  for(let i = 0; i < textLines.length; i++){
    let game = textLines[i]
    let blueResult = maxCubesOfColor(game, "blue")
    let greenResult = maxCubesOfColor(game, "green")
    let redResult = maxCubesOfColor(game, "red")
    if (blueResult && greenResult && redResult ) {
      sum += i + 1 // game number is one more than index
    }
  }
  console.log(sum)  
});
