var express = require('express');
var router = express.Router();
const game = require("../modules/game");

router.get('/', function(req, res, next) {
    res.render('endgame', 
    { 
        user_score: '5', 
        title: 'looksay_', 
        user_message: "You did grrreat!"
        // TODO: add chart with all scores
     });
});

module.exports = router;
