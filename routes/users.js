var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/hoho', function(req, res, next) {
  res.send('hoho hoho hoho');
});

router.get('/hohoho', function(req, res, next) {
  res.json({name: "jungmin", age: "24", gender:"man"});
});

router.get('/hohohoho', function(req, res, next) {
  res.send('hoho hoho hoho hoho');
});

router.get('/hohohohoho', function(req, res, next) {
  res.send('hoho hoho hoho hoho hoho');
});

module.exports = router;
