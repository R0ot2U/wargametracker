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

async function asyncDB(gameId) {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM games WHERE game_id=\''+gameId+'\'');
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
router.get('/', async function(req, res, next) {
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
                //pool.end();
                }
            );  
            res.render('game', {gameId: gameId, title: "Game Tracker"});
        } else if(req._parsedOriginalUrl.query != null) {
            console.log(req._parsedOriginalUrl.query);
            var results2 = await asyncDB(req.query.gameId);
            console.log(results2);
                var gameData = {
                    "game_id": results2.game_id,
                    "created_at": results2.created_at,
                    "updated_at": results2.updated_at,
                    "game_description": results2.game_description,
                    "player1_name": results2.player1_name,
                    "player1_list_notes": results2.player1_list_notes,
                    "player1_faction": results2.player1_faction,
                    "player2_name": results2.player2_name,
                    "player2_list_notes": results2.player2_list_notes,
                    "player2_faction": results2.player2_faction,
                    "battle_at": results2.battle_at,
                    "game_mission": results2.game_mission,
                    "player1_deployment": results2.player1_deployment,
                    "player2_deployment": results2.player1_deployment,
                    "player1_picked_deployment": results2.player1_picked_deployment,
                    "player2_picked_deployment": results2.player2_picked_deployment,
                    "player1_first_turn": results2.player1_first_turn,
                    "player2_first_turn": results2.player2_first_turn,
                    "game_length_input": results2.game_length_input,
                    "game_length_remaining": results2.game_length_remaining,
                    "game_length_exceeded": results2.game_length_exceeded,
                    "game_length_running": results2.game_length_running,
                    "player1_vp_total": results2.player1_vp_total,
                    "player1_vp_primary_total": results2.player1_vp_primary_total,
                    "player1_vp_secondary_total": results2.player1_vp_secondary_total,
                    "player1_vp_primary_turn2": results2.player1_vp_primary_turn2,
                    "player1_vp_primary_turn3": results2.player1_vp_primary_turn3,
                    "player1_vp_primary_turn4": results2.player1_vp_primary_turn4,
                    "player1_vp_primary_turn5": results2.player1_vp_primary_turn5,
                    "player1_secondary1_name": results2.player1_secondary1_name,
                    "player1_vp_secondary1_turn1": results2.player1_vp_secondary1_turn1,
                    "player1_vp_secondary1_turn2": results2.player1_vp_secondary1_turn2,
                    "player1_vp_secondary1_turn3": results2.player1_vp_secondary1_turn3,
                    "player1_vp_secondary1_turn4": results2.player1_vp_secondary1_turn4,
                    "player1_vp_secondary1_turn5": results2.player1_vp_secondary1_turn5,
                    "player1_secondary2_name": results2.player1_secondary2_name,
                    "player1_vp_secondary2_turn1": results2.player1_vp_secondary2_turn1,
                    "player1_vp_secondary2_turn2": results2.player1_vp_secondary2_turn2,
                    "player1_vp_secondary2_turn3": results2.player1_vp_secondary2_turn3,
                    "player1_vp_secondary2_turn4": results2.player1_vp_secondary2_turn4,
                    "player1_vp_secondary2_turn5": results2.player1_vp_secondary2_turn5,
                    "player1_secondary3_name": results2.player1_secondary3_name,
                    "player1_vp_secondary3_turn1": results2.player1_vp_secondary3_turn1,
                    "player1_vp_secondary3_turn2": results2.player1_vp_secondary3_turn2,
                    "player1_vp_secondary3_turn3": results2.player1_vp_secondary3_turn3,
                    "player1_vp_secondary3_turn4": results2.player1_vp_secondary3_turn4,
                    "player1_vp_secondary3_turn5": results2.player1_vp_secondary3_turn5,
                    "player1_cp_start": results2.player1_cp_start,
                    "player1_cp_current": results2.player1_cp_current,
                    "player2_vp_total": results2.player2_vp_total,
                    "player2_vp_primary_total": results2.player2_vp_primary_total,
                    "player2_vp_secondary_total": results2.player2_vp_secondary_total,
                    "player2_vp_primary_turn2": results2.player2_vp_primary_turn2,
                    "player2_vp_primary_turn3": results2.player2_vp_primary_turn3,
                    "player2_vp_primary_turn4": results2.player2_vp_primary_turn4,
                    "player2_vp_primary_turn5": results2.player2_vp_primary_turn5,
                    "player2_secondary1_name": results2.player2_secondary1_name,
                    "player2_vp_secondary1_turn1": results2.player2_vp_secondary1_turn1,
                    "player2_vp_secondary1_turn2": results2.player2_vp_secondary1_turn2,
                    "player2_vp_secondary1_turn3": results2.player2_vp_secondary1_turn3,
                    "player2_vp_secondary1_turn4": results2.player2_vp_secondary1_turn4,
                    "player2_vp_secondary1_turn5": results2.player2_vp_secondary1_turn5,
                    "player2_secondary2_name": results2.player2_secondary2_name,
                    "player2_vp_secondary2_turn1": results2.player2_vp_secondary2_turn1,
                    "player2_vp_secondary2_turn2": results2.player2_vp_secondary2_turn2,
                    "player2_vp_secondary2_turn3": results2.player2_vp_secondary2_turn3,
                    "player2_vp_secondary2_turn4": results2.player2_vp_secondary2_turn4,
                    "player2_vp_secondary2_turn5": results2.player2_vp_secondary2_turn5,
                    "player2_secondary3_name": results2.player2_secondary3_name,
                    "player2_vp_secondary3_turn1": results2.player2_vp_secondary3_turn1,
                    "player2_vp_secondary3_turn2": results2.player2_vp_secondary3_turn2,
                    "player2_vp_secondary3_turn3": results2.player2_vp_secondary3_turn3,
                    "player2_vp_secondary3_turn4": results2.player2_vp_secondary3_turn4,
                    "player2_vp_secondary3_turn5": results2.player2_vp_secondary3_turn5,
                    "player2_cp_start": results2.player2_cp_start,
                    "player2_cp_current": results2.player2_cp_current
                }
            console.log("gameData: "+gameData.game_id);
            res.render('tracker', {"gameData": gameData });
        };
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});


module.exports = router;
