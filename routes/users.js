var express = require('express');
var router = express.Router();
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/nickname", (req, res) => {
  const shortRandomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals], 
    length: 2,
    separator: '-',
  }); 
  res.send(shortRandomName);
  // execute your function from server
});

module.exports = router;
