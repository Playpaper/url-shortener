// require handlebars (not express-handlebars)
const handlebars = require('handlebars')

handlebars.registerHelper('disabled', function(shortCode) {
  return shortCode ? '' : 'disabled'
})
