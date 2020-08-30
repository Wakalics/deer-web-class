var express = require('express');
var router = express.Router();
const crypo = require('crypto');

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

router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email;
    const pwd = req.body.pwd;
    const salt = (await crypo.randomBytes(64)).toString('base64');
    const hashedPwd = (crypo.pbkdf2Sync(pwd, salt, 100000, 64, 'SHA512').toString('base64'));
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO USER_TB(email, hashed_pwd, pwd_salt) VALUES(?, ?, ?)', [email, hashedPwd, salt]);
    connection.release();
    res.json({ status: 201, msg: 'Signing up succeed!'});
  } catch (err) {
    console.log(err);
    res.json({ status: 500 , msg: 'Server Error!'});
  }
 
});

router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email;
    const pwd = req.body.pwd;
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT * FROM USER_TB WHERE email = ?', [email]);
    connection.release();
    if (users.length === 0) {
      return res.json({ status: 401, message: "Email does not exists."});
    }
    const user = users[0];
    const hashedPwd = (crypo.pbkdf2Sync(pwd, user.pwd_salt, 100000, 64, 'SHA512')).toString('base64');
    if (hashedPwd !== user.hashed_pwd) {
      return res.json({ status: 401, msg: 'Password does not match!'})
    }
    res.json({ status: 201, msg: 'Loggign in succeed!'});
  } catch (err) {
    console.log(err);
    res.json({ status: 500 , msg: 'Server Error!'});
  }
 
});


module.exports = router;
