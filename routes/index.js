const express = require('express');
const router = express.Router();
const game = require("../modules/game");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(
    'index', 
    { 
      title: 'looksay_', 
      randomInitSequence: '112',
      players: game.getPlayers(),
    }
  );
});

module.exports = router;
