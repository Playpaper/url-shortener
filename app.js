const express = require('express')

// set database connection
const mongoose = require('mongoose')

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

app.get('/', (req, res) => {
  res.send(`Hello, it's an url shortener app`)
})

app.listen(PORT, () => {
  console.log(`The express server is listening on https://localhost/${PORT}`)
})