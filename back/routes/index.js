var express = require('express');
var router = express.Router();
var users = require('./user.route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', users);

module.exports = router;
