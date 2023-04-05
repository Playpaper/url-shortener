const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const generateCode = require('./generate_code')

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => console.log('mongodb error !'))
db.once('open', () => console.log('mongodb connected !'))

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log(`generateCode = ${generateCode()}`)
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`The express server is listening on https://localhost/${PORT}`)
})