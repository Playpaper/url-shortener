// define generateCode function (shorten url)
function generateCode() {
  
  // define the kind of code
  const LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
  const UPPER_LETTERS = LOWER_LETTERS.toUpperCase()
  const NUMBERS = '1234567890'
  const LENGTH = 5

  const STR = LOWER_LETTERS + UPPER_LETTERS + NUMBERS
  
  // create code => invoke randomElement function
  let code = ''

  for(let i = 0; i < LENGTH; i++) {
    const randomIndex =  Math.floor(Math.random() * STR.length)
    code += STR.charAt(randomIndex)
  }

  // return code
  return code
}

// export generateCode function for other files to use
module.exports = generateCode

