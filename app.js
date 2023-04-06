const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Url = require('./models/url')
const generateCode = require('./generate_code')
require("./public/javascripts/helpers")

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
app.use(express.urlencoded({ extended:true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalUrl = req.body.urlOrigin
  const shortUrl = `https://localhost:${PORT}/` 
  // find db if originalUrl exist ? true(data from db) : false(create a code) 
  Url.findOne({ originalUrl })
    .lean()
    .then(data => {
      console.log('data = ', data)
      if(data) {
        res.render('index', { shortUrl, originalUrl: data.originalUrl, shortCode: data.shortCode })
      }else{
        checkCodeRepeat(res, shortUrl, originalUrl, generateCode()) 
      }
    })
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`The express server is listening on https://localhost/${PORT}`)
})

function checkCodeRepeat(res, shortUrl, originalUrl, shortCode) {
  console.log('(in)shortCode = ',  shortCode, 'originalUrl = ', originalUrl)
  Url.exists({ shortCode })
    .then(data => {
      if(data) { 
        // repeat > generate new code
        console.log('(re)shortCode = ',  shortCode, 'originalUrl = ', originalUrl)
        checkCodeRepeat(res, shortUrl, originalUrl, generateCode())
      }else {
        // no repeat > create code
        console.log('(final)shortCode = ',  shortCode, 'originalUrl = ', originalUrl)
        Url.create({ originalUrl, shortCode })
          .then(() => res.render('index', { shortUrl, originalUrl, shortCode }))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
}