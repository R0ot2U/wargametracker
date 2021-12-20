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

async function asyncDB() {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM games');
      const results = { 'results': (result) ? result.rows : null};
      console.log("results: "+results);
      client.release();
      return results;
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  };
  
var express = require('express');
var path = require('path');
var router = express.Router();

/* GET game tracker page. */
router.get('/', async function(req, res) {
    try {
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
            res.render('game', {gameId: gameId});
        } else if(req._parsedOriginalUrl.query != null) {
            console.log(req._parsedOriginalUrl.query);
            //var results2 = await asyncDB();
            //res.json(results2);
        };
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});


module.exports = router;