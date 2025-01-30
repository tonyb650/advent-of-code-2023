const fs = require('fs');

fs.readFile('data.txt', (err, data) => {
if (err) throw err;
  let textLines = data.toString().split("\n");
  let sum = 0;
  for (let i = 0; i < textLines.length; i++){
    let firstDigit
    let lastDigit
    let line = textLines[i]
    for (let j = 0; j < line.length ; j++){
      if (line[j] == "0" || +line[j] > 0){
        lastDigit = +line[j]
      }
    }
    for (let j = line.length-1; j >=0;  j--){
      if (line[j] == "0" || +line[j] > 0){
        firstDigit = +line[j]
      }
    }
    if( i < 100 ){
      console.log(line)
      console.log("FIRST:"+firstDigit  + "    LAST:"+lastDigit)
      console.log("adding"+(firstDigit*10+lastDigit))
    }
      
    sum += firstDigit*10+lastDigit
  }
  console.log(sum)
});
