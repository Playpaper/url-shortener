// define randomElement function
function randomElement(collection) {
  let index = Math.floor(Math.random() * collection.length)
  return collection[index]
}

// define generateCode function (shortener url)
function generateCode() {
  console.log(`This function will generate code !`)
  
  // define the kind of code
  // const LOWER_CASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
  // const UPPER_CASE_LETTERS = LOWER_CASE_LETTERS.toUpperCase()
  // const NUMBERS = '1234567890'
  const NUMBERS = '1234'
  const SHORT_LENGTH = 1

  // create a collection of shortener url
  let collection = []

  collection = collection
    // .concat(LOWER_CASE_LETTERS.split(''))
    // .concat(UPPER_CASE_LETTERS.split(''))
    .concat(NUMBERS.split(''))
  
  // create code => invoke randomElement function
  let code = ''
  for(let i = 0; i < SHORT_LENGTH; i++) {
    code += randomElement(collection)
  }

  // check if code repeat
  // repeat code
  // new code

  // return code
  return code
}

// export generateCode function for other files to use
module.exports = generateCode

