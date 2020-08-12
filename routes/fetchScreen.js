var express = require('express');
var router = express.Router();
const game = require("../modules/game");

router.get('/:screen', function(req, res, next) {
    const screen = req.params.screen;

    const defaultData = {
        layout: false,
        players: game.getPlayers()
    };

    let data;

    switch (screen) {
        case "lobby":
            data = {
                ...defaultData,
            };
            break;
        case "play":
            data = {
                ...defaultData,
                randomInitSequence: '112',
            };
            break;
        case "endgame":
            data = {
                ...defaultData,
                user_score: '5', 
                user_message: "You did grrreat!"
            }
            break;
        default:
            data = {};
            break;
    }

    res.render(`screens/${screen}`, data);
});

module.exports = router;
