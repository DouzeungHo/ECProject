var express = require('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
	res.render('register', {title:'register'});
});

router.get('/login', function(req, res, next) {
	res.render('login', {title:'login'});
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: '拼团游'});
});

module.exports = router;
