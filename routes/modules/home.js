const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const generateCode = require('../../generate_code')
const PORT = 3000
const shortUrl = `http://localhost:${PORT}/` 

require("../../public/javascripts/helpers")

router.get('/', (req, res) => {
  res.render('index')
})

// find db if originalUrl exist ? true(data from db) : false(create a code) 
router.post('/', (req, res) => {
  const originalUrl = req.body.urlOrigin

  Url.findOne({ originalUrl })
    .lean()
    .then(data => {
      if(data) {
        res.render('index', { shortUrl, originalUrl: data.originalUrl, shortCode: data.shortCode })
      }else{
        checkCodeRepeat(res, shortUrl, originalUrl, generateCode()) 
      }
    })
    .catch(err => console.log(err))
})

// short url > original url
router.get('/:shortCode', (req, res) => {
  const shortCode = req.params.shortCode
  Url.findOne({ shortCode })
    .then(data => {
      data ? res.redirect(data.originalUrl) : res.render('index', { wrongShortCode: shortUrl+shortCode })
    })
    .catch(err => console.log(err))
})

// create a new shortCode and check if repeat
function checkCodeRepeat(res, shortUrl, originalUrl, shortCode) {
  Url.exists({ shortCode })
    .then(data => {
      if(data) { 
        // repeat > generate new code
        checkCodeRepeat(res, shortUrl, originalUrl, generateCode())
      }else {
        // no repeat > create code
        Url.create({ originalUrl, shortCode })
          .then(() => res.render('index', { shortUrl, originalUrl, shortCode }))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
}

module.exports = router