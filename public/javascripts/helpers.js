// require handlebars (not express-handlebars)
const handlebars = require('handlebars')

handlebars.registerHelper('disabled', function(shortCode) {
  return shortCode ? '' : 'disabled'
})







// //initialize handlebars (not express-handlebars)
// const Handlebars = require('handlebars')

// Handlebars.registerHelper("search", function (selectedValue, valueName) {
//   return (selectedValue === valueName) ? "selected" : ""
// })

// Handlebars.registerHelper("selected", function ( selectedKind, kindName, selectedSort, sortName) {
//   return (selectedKind === kindName && selectedSort === sortName) ? "selected" : ""
// })

