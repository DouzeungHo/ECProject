var express = require('express');
var router = express.Router();

var responseData;

router.use( function (req,res,next) {
    responseData = {
        code: 0,
        message:''
    };
    next();
});

var users = require('../models/users.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
	var email = req.body.email;
    users.findOne({
        email:email
    },function (err,doc) {
        if(doc){
            responseData.code = 400;
            res.json(responseData);
            return;
        }
        // 保存用户注册的信息到数据中
        var user = new users({
            username: req.body.userName,
            password: req.body.password,
            email: req.body.email
        });
        console.log("success save:" + email);
        user.save();
        responseData.code = 200;
        res.json(responseData);
        return;
    });
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
    users.findOne({
        email:email
    },function (err,doc) {
        if(doc && doc.password == password) {
            responseData.code = 200;
        } else if(!doc) {
        	responseData.code = 400;
        } else {
        	responseData.code = 500;
        }
        res.json(responseData);
        return;
    });
});

module.exports = router;
