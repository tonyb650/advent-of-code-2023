const fs = require("fs");
const seeds = "104847962 3583832 1212568077 114894281 3890048781 333451605 1520059863 217361990 310308287 12785610 3492562455 292968049 1901414562 516150861 2474299950 152867148 3394639029 59690410 862612782 176128197".split(" ").map((seed)=> parseInt(seed))
// const seeds = "79 14 55 13".split(" ").map((seed)=> parseInt(seed))
// console.log(seeds)

fs.readFile("maps.txt", (err, data) => {
  if (err) throw err;

  let mapName = []
  let mapData = []
  let rawMaps = data.toString().split("\r\n\r\n"); // take data returned from file read and split into an array
  // console.log(rawMaps)
  for(let i=0; i<rawMaps.length; i++){
    console.log("i: "+i)
    console.log(rawMaps[i])
    mapName.push(rawMaps[i].split(":")[0])
    let block = []
    let mapDataBlock = (rawMaps[i].split(":")[1])
    let mapDataLines = mapDataBlock.split("\r\n")
    let garbage = mapDataLines.shift()
    if (garbage.length > 0) console.log(" ****** Garbage not Garbage! ********" + garbage)
    for (let j=0; j<mapDataLines.length; j++){
      console.log("j: " + mapDataLines[j])
      let destination = parseInt(mapDataLines[j].split(" ")[0])
      let source = parseInt(mapDataLines[j].split(" ")[1])
      let range = parseInt(mapDataLines[j].split(" ")[2])
      block.push({destination, source, range})
    }
    mapData.push(block)
  }
  console.log(mapName)
  console.log(mapData)
  // start solving
  let minLocationNum
  for(let h=0; h < seeds.length; h+=2){ // loop through each 'start of range'
    console.log("Main loop. h="+h+" of " + seeds.length + ". minLocationNum="+minLocationNum)
    for(let i = 0; i < seeds[h+1]; i++){ // loop through each seed in range
      let requirement = seeds[h]+i
      // console.log("_________________")
      // console.log("Seed #"+requirement)
      for(let j = 0; j < mapData.length; j++){ // loop through each map
        // console.log("Processing new MAP: "+mapName[j])
        // let lineMatch = false
        for(let k = 0; k < mapData[j].length; k++){ // loop through each line
          if(requirement >= mapData[j][k].source && requirement < mapData[j][k].source + mapData[j][k].range ){
            // if (i==1){
            //   console.log("requirement = "+ requirement)
            //   console.log("source = " +  mapData[j][k].source)
            //   console.log("source + range = " + +(mapData[j][k].source + mapData[j][k].range))
            // }
            requirement = requirement - mapData[j][k].source + mapData[j][k].destination
            k = mapData[j].length
            // console.log("setting requirement to: " + requirement)
          }
        }
        // if(!lineMatch){ // no matching
        //   requirement = requirement
        // }
        // console.log("   -> results for seed #"+i)
        // console.log("with map: "+mapName[j])
        // console.log("   -> requirement for next map= "+requirement)
      }
      if (h===0 && i===0){
        minLocationNum = requirement
      } else{
        minLocationNum = Math.min(requirement,minLocationNum)
      }
      // console.log("***NEW MinLocationNumber: " + minLocationNum+"***")
    }
  }
  console.log("FINAL MinLocationNumber: " + minLocationNum)

})