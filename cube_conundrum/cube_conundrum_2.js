const fs = require("fs");

fs.readFile("games.txt", (err, data) => {
  if (err) throw err;

  // initialize variables and data array
  let sum = 0;
  let games = data.toString().split("\n"); // take data returned from file read and split into an array

  // main loop
  for(let i = 0; i < games.length; i++){
    let game = games[i].split(": ")[1]
    console.log("game" + game)
    let neededBlue = 0
    let neededRed = 0
    let neededGreen = 0
    let pulls = game.split("; ")
    console.log("pulls")
    console.log(pulls)
    for (let j = 0; j < pulls.length; j++ ){
      let colors = pulls[j].split(", ")
      for(let k = 0; k < colors.length; k++){
        const [cubeCount, cubeColor] = colors[k].split(" ")
        console.log("cubeCount= " + cubeCount + " cubeColor= " + cubeColor)
        switch (cubeColor.substring(0,3)){
          case "blu":
            neededBlue = Math.max(neededBlue,cubeCount);
            break;
          case "red":
            neededRed = Math.max(neededRed,cubeCount);
            break;
          case "gre":
            neededGreen = Math.max(neededGreen,cubeCount);
            break;
          default:
            console.log("********ERROR**********")
        }
      }
    }
    console.log("FINAL blue "+neededBlue+" green "+neededGreen+" red "+neededRed)
    let power = neededBlue*neededGreen*neededRed
    console.log("power="+power)
    sum += power
  }
  console.log(sum)
});


// split on game
// split on pull (;)
// split on color(, )
// loop through colors
// split on space [ number , color]
// Math.max(neededRed)