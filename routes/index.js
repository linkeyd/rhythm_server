var express = require('express');
var router = express.Router();
var user = require('../controllers/User');
var talk = require('../controllers/Talk');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',user.login);
router.post('/register',user.register);
router.post('/passwordUpdate',user.passwordUpdate);
router.get('/personalDetails',user.personalDetails);


router.post('/talkAdd',talk.talkAdd);
router.get('/talkSelect',talk.talkSelect);
router.post('/talkPerson',talk.talkPerson);
router.post('/commentSelect',talk.commentSelect);
router.post('/commentAdd',talk.commentAdd);
router.post('/talkDelete',talk.talkDelete);
router.post('/commentDelete',talk.commentDelete);
module.exports = router;
