var express = require('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
	res.render('register', {title:'注册'});
});

router.get('/login', function(req, res, next) {
	res.render('login', {title:'登录'});
});

router.get('/logout', function(req, res, next) {
	delete req.session.user;
	res.redirect('/');
});

router.get('/createRoute', function(req, res, next) {
	var user = req.session.user
	if (req.session.user != null) {
		res.render('createRoute', {
			title:'新的行程',
			user: user
		});
	} else {
		res.redirect('/login');
	}
});

router.get('/userCenter', function(req, res, next) {
	var user = req.session.user;
	res.render('personDetail', {
		title:'用户详情',
		user: user
	});
});


/* GET home page. */
router.get('/', function(req, res, next) {
    var loginUser = req.session.user;
    var isLogined = !!loginUser;
    if (isLogined) {
		res.render('index', { 
			title: '拼团游欢迎:'+loginUser.username,
			user: loginUser
		});
	} else {
		res.render('index', { title: '拼团游'});
	}
});

module.exports = router;
