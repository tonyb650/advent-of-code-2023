// CORRECT: 248_569_531 

const fs = require("fs");

fs.readFile("data.txt", (err, data) => {
  if (err) throw err;

  let cardValue = {
    2 : 0,
    3 : 1,
    4 : 2,
    5 : 3,
    6 : 4,
    7 : 5,
    8 : 6,
    9 : 7,
    T : 8,
    J : 9,
    Q : 10,
    K : 11,
    A : 12,
  }

  const returnValue = (score) => {
    console.log("Evaluating score: "+ score)
    if(score.includes(5)) return 6
    if(score.includes(4)) return 5
    if(score.includes(3) && score.includes(2)) return 4
    if(score.includes(3)) return 3
    let pairs = score.reduce((twos, cardCount) => cardCount === 2 ? twos + 1 : twos, 0)
    return pairs > 0 ? pairs : 0
  }
  
  let rows = data.toString().split("\r\n"); // take data returned from file read and split into an array
  let hands = []
  // console.log(rows)
  for(let i=0; i < rows.length; i++){
    let [ hand, bid ] = rows[i].split(" ")

    // Calculate value1 for each hand
    let score = []
    let usedCards = new Set()
    for (let card = 0; card < 5; card++){
      let matchCount = 0
      // console.log(`hand: ${hand}, card#: ${card}, matchCount: ${matchCount}`)
      // console.log("This card= " + hand[card])
      if (!usedCards.has(hand[card])){
        // console.log("here")
        for (let card2 = card; card2 < 5; card2++) {
          // console.log("Card2#: " + card2)
          if (hand[card] === hand[card2]) {
            usedCards.add(hand[card])
            matchCount++
          }
        }
      }
      score.push(matchCount)
    }
    // console.log("EVALATE SCORE: " + score)
    let value1 = returnValue(score) * (13**5)
    
    // calculate value2 for each hand
    let value2 = [...hand].reduce((totalVal, card, index) => totalVal + cardValue[card]*(13**(4-index)),0 )

    console.log(`hand ${hand}  Bid: ${bid} value1: ${value1} value2: ${value2}`)
    console.log("Value1 value: "+ value1*(13**6))
    hands.push([hand, bid, value1+value2])
  }
  console.log(hands)
  hands.sort((handA, handB) => handA[2] - handB[2])
  console.log(hands)
  let winnings = hands.reduce((accum, hand, index) => accum + hand[1]*(index + 1), 0)
  console.log(winnings)
})
