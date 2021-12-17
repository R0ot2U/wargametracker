const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
  
var express = require('express');
var path = require('path');
var router = express.Router();

/* GET game tracker page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/tracker.html'));
    console.log(req._parsedOriginalUrl.query);
    if(req._parsedOriginalUrl.query == null){
        //generate a unique id based on timestamp uuidv4 would be a unique id that's random
        const gameId1 = uuidv1();
        console.log(gameId1); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'   
        res.redirect('/game?gameId='+gameId1);
    } else if(req._parsedOriginalUrl.query != null) {
        console.log(req._parsedOriginalUrl.query);
    };
});


module.exports = router;
