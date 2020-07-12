var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('play', { title: 'looksay_', randomInitSequence: '112' });
});

module.exports = router;
