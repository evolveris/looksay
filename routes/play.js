var express = require('express');
var router = express.Router();
const game = require("../modules/game");

router.get('/', function(req, res, next) {

console.log(">>>>>>>>>>>>>>>>.", game.getPlayers());

    res.render('play', 
    { 
        title: 'looksay_', 
        players: game.getPlayers(),
     });
});

module.exports = router;
