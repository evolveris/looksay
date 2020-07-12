var express = require('express');
var router = express.Router();

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const shortName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
  length: 2,
  separator: '-',
}); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'looksay_', randomUsername: shortName, randomInitSequence: '112' });
});

module.exports = router;
