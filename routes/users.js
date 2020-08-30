var express = require('express');
var router = express.Router();

/*
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'database-1.c2qix7nmsmbv.ap-northeast-2.rds.amazonaws.com',
  user: '******',
  password: '******',
  database: 'School'
})

// GET users listing. 
router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM USER_TB', (err, results) => {
    const firstUser = results[0];
    const userId = firstUser.id;
    connection.query('SELECT * FROM REPORT_TB WHERE user_id = ?', [userId], (err2, results2) => {
      res.json({ status: 200, arr: results2 });
    })
  })
});

router.get('/hoho', function(req, res, next) {
  res.send('hoho hoho hoho');
});

router.get('/hohoho', function(req, res, next) {
  res.json({name: "jungmin", age: "24", gender:"man"});
});
*/

const pool = require('../utils/mysql');

/*
// GET users listing. 
router.get('/', async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM USER_TB');
    connection.release();
    res.json({ status: 200, arr: results });
  } catch (err) {
    console.log(err);
    res.json({ status: 500 , msg: 'Server Error!'});
  }
 
});
*/

router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email;
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO USER_TB(email) VALUES(?)', [email]);
    connection.release();
    res.json({ status: 201, msg: 'Success!'});
  } catch (err) {
    console.log(err);
    res.json({ status: 500 , msg: 'Server Error!'});
  }
 
});


module.exports = router;
