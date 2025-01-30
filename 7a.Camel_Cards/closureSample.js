const credits = ((num) => {
  let credits = num
  console.log(`Initial credits: ${credits}`)
  return (cost) => {
    credits -= cost
    if (credits > 0) {
      console.log(`New credit balance: ${credits}`)
    } else {
      console.log(`You are out of credits`)
    }

  }
})(7)

credits(2)
credits(1)