// Score
// Hand strength (5 of a kind, etc.)
// Hand has J
// QQQQ2 beats JKKK2
// KTJJT beats QQQJA
// QQQJA beats T55J5

// TOO HIGH: 250_633_979

const fs = require("fs");

fs.readFile("data.txt", (err, data) => {
  if (err) throw err;

  let handLabel = {
    0 : "Singles",
    1 : "One Pair",
    2 : "Two Pair",
    3 : "Three of a kind",
    4 : "Full house",
    5 : "Four of a kind",
    6 : "Five of a kind",
  }

  let cardValue = {
    2 : 1,
    3 : 2,
    4 : 3,
    5 : 4,
    6 : 5,
    7 : 6,
    8 : 7,
    9 : 8,
    T : 9,
    J : 0,
    Q : 10,
    K : 11,
    A : 12,
  }

  const handStrength = (groupings, jCount) => {
    console.log("Evaluating groupings: "+ groupings + ". Jokers = " + jCount)
    const maxGroup = groupings.reduce((a,v) => Math.max(a,v),0)
    const withJokers = maxGroup + jCount
    console.log("maxGroup = " + maxGroup + " /// withJokers = " + withJokers)
    if(withJokers === 5) return 6                                               // 5 of a kind = 6
    if(withJokers === 4) return 5                                               // 4 of a kind = 5
    if(jCount === 0 && groupings.includes(3) && groupings.includes(2)) return 4 // Natural Full House = 4
    let pairs = groupings.reduce((twos, cardCount) => cardCount === 2 ? twos + 1 : twos, 0) // How many natural pairs
    if (pairs === 2 && jCount > 0) return 4                                     // Full house with one joker = 4
    if(withJokers === 3) return 3                                               // 3 of a kind = 3
    if (pairs === 2 && jCount === 0) return 2                                   // 2 natural pair = 2
    if (jCount === 1) return 1                                                  // 1 pair = 1 (w/j)
    if (pairs === 1) return 1                                                   // 1 natural pair = 1
    if (pairs === 0 && jCount === 0) return 0                                   // Singles only
    throw new Error("Should never get here")
  }
  
  let rows = data.toString().split("\r\n"); // take data returned from file read and split into an array
  let hands = []
  // console.log(rows)
  for(let i=0; i < rows.length; i++){
    let [ hand, bid ] = rows[i].split(" ")

    let jCount = 0
    let groupings = []
    let usedCards = new Set()
    for (let card = 0; card < 5; card++){
      let matchCount = 0 
      if(hand[card] == "J") {
        jCount ++
      } else {
        // all other cards
        if (!usedCards.has(hand[card])){  // Haven't seen this card before
          // console.log("here")
          for (let card2 = card; card2 < 5; card2++) { // loop through all cards after this one to see if there are more of this same one
            // console.log("Card2#: " + card2)
            if (hand[card] === hand[card2]) {
              matchCount++
            }
          }
          usedCards.add(hand[card])
        }
        groupings.push(matchCount)
      }
    }
    // console.log("EVALUATE SCORE: " + score)
    let handValue = handStrength(groupings, jCount) * (13**5) // handStrength goes in the 5th place from the right (base 13)
    
    // calculate cardsValue for each hand
    let cardsValue = [...hand].reduce((totalVal, card, index) => totalVal + cardValue[card]*(13**(4-index)),0 ) // essentially turning the hand into a 'base 13' number

    console.log(`hand ${hand}  Bid: ${bid} handValue: ${handValue} cardsValue: ${cardsValue}`)
    console.log("HandValue: "+ handValue/(13**5) + " -or " + handLabel[handValue/(13**5)]  +"\n")


    hands.push([hand, bid, handValue + cardsValue, handValue, cardsValue, handLabel[handValue/(13**5)]])
    while (cardsValue>1) {
      let ones = cardsValue%13
      console.log(ones)
      cardsValue = (cardsValue-ones)/13
      console.log("new cardsValue "+ cardsValue)
    }
  }
  console.log("before sort")
  console.log(hands)
  
  hands.sort((handA, handB) => handA[2] - handB[2])

  console.log("after sort")
  console.log(hands)
  
  let winnings = hands.reduce((accum, hand, index) => accum + hand[1]*(index + 1), 0)
  
  console.log(winnings)
})
