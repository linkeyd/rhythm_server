var express = require('express');
var router = express.Router();
var user = require('../controllers/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',user.login);
router.post('/register',user.register);

module.exports = router;
