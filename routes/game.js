const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

//db
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

var pgp = require('pg-promise')(/* options */)
var db = pgp(process.env.DATABASE_URL+"?ssl=true");

// a query with in-line value transformation + conversion:
db.one('SELECT count(*) FROM games', [], c => +c.count)
    .then(count => {
        // count = a proper integer value, rather than an object with a string
    });
  
var express = require('express');
var path = require('path');
var router = express.Router();

/* GET game tracker page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/tracker.html'));
    console.log(req._parsedOriginalUrl.query);
    if(req._parsedOriginalUrl.query == null){
        //generate a unique id based on timestamp uuidv4 would be a unique id that's random
        const gameId = uuidv1();
        console.log(gameId); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 
        pool.query(
            "INSERT INTO games(game_id)VALUES('"+gameId+"')",
            (err, res) => {
              console.log(err, res);
              pool.end();
            }
          );  
        res.redirect('/game?gameId='+gameId);
    } else if(req._parsedOriginalUrl.query != null) {
        console.log(req._parsedOriginalUrl.query);
    };
});


module.exports = router;
