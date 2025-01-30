// const times = [7,15,30]
// const distancesToBeat = [9,40,200]
const times = [49,97,94,94]
const distancesToBeat = [263,1532,1378,1851]
let waysToWin = 1
for (let race = 0; race < times.length; race++){
  let time = times[race]
  let distanceToBeat = distancesToBeat[race]
  let winningHoldTimes = []
  for (let holdButtonTime = 0; holdButtonTime < time; holdButtonTime++){
    let runTime = time - holdButtonTime 
    let distance = runTime * holdButtonTime // holdButtonTime is also velocity: mm/s
    if (distance > distanceToBeat) {
      winningHoldTimes.push(holdButtonTime)
    }
  }
  console.log(winningHoldTimes)
  console.log(winningHoldTimes.length)
  waysToWin *= winningHoldTimes.length
}

console.log("Ways to win: " + waysToWin)
