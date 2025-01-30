const time = 49979494
const distanceToBeat = 263_153_213_781_851
let pointer1 = 0
let pointer2 = time/2
// let runTime = time - holdButtonTime 
// let distance = runTime * holdButtonTime // holdButtonTime is also velocity: mm/s
let i = 0
while ( pointer2 > pointer1 && i< 50 ) {
  // search down from middle
  let holdButtonTime = ~~((pointer2 + pointer1) / 2) // (midpoint)
  console.log("holdButtonTime: " + holdButtonTime + ". Pointer1: "+ pointer1 + ". Pointer2: " + pointer2)
  let runTime = time - holdButtonTime 
  let distance = runTime * holdButtonTime // holdButtonTime is also velocity: mm/s
  console.log("distance: "+ distance)
  if (distance < distanceToBeat) {
    pointer1 = holdButtonTime 
  } else {
    console.log(holdButtonTime + " will win")
    pointer2 = holdButtonTime-1
  }
  // if(pointer1 == pointer2) console.log("FINAL: "+holdButtonTime)
    i++
}
pointer1 = time/2
pointer2 = time

console.log("*****************************************")
while ( pointer2 > pointer1 && i< 100 ) {
  // search down from middle
  let holdButtonTime = ~~((pointer2 + pointer1) / 2) // (midpoint)
  console.log("holdButtonTime: " + holdButtonTime + ". Pointer1: "+ pointer1 + ". Pointer2: " + pointer2)
  let runTime = time - holdButtonTime 
  let distance = runTime * holdButtonTime // holdButtonTime is also velocity: mm/s
  console.log("distance: "+ distance)
  if (distance < distanceToBeat) {
    pointer2 = holdButtonTime 
  } else {
    console.log(holdButtonTime + " will win")
    pointer1 = holdButtonTime+1
  }
  if(pointer1 == pointer2) console.log("FINAL: "+holdButtonTime + " ")
    i++
}

// 43998540 will win
//  5980954 will win

// 38,017,586 is TOO LOW