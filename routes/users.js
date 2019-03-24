var express = require('express');
var router = express.Router();

var responseData;

router.use( function (req,res,next) {
    responseData = {
        code: 0
    };
    next();
});

var users = require('../models/users.js');
var UserDetail = require('../models/userDetail.js');
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

router.post('/detailUpdate', function(req, res, next) {
    var email = req.session.user.email;
    UserDetail.findOne({ userEmail: email }, function (err, doc) {
        if (doc) {
            console.log("find!!!");
            console.log(doc);
            console.log(req.body);
            //update
            doc.update({
                userEmail: email, 
                detailName: req.body.detailName,
                selectedLanguages: req.body.selectedLanguages,
                sex: req.body.sex,
                detailProvince: req.body.detailProvince,
                detailCity: req.body.detailCity, 
                detailID: req.body.detailID, 
                detailPhone: req.body.detailPhone,
                selfIntroduction: req.body.selfIntroduction
            },  function(err, docs) {
                    if (err) {
                         console.log(err);
                    } else {
                        console.log(docs);
                    }
                });
            responseData.code = 200;
            //change finish
        } else {
            console.log("not find!!!");
            var detail = new UserDetail({
                userEmail: email,
                detailName: req.body.detailName,
                selectedLanguages: req.body.selectedLanguages,
                sex: req.body.sex,
                detailProvince: req.body.detailProvince,
                detailCity: req.body.detailCity,
                detailID: req.body.detailID,
                detailPhone: req.body.detailPhone,
                selfIntroduction: req.body.selfIntroduction
            });
            detail.save();
            responseData.code = 200;
        }
        res.json(responseData);
        console.log(responseData);
    })
});

router.post('/getUserDetail', function(req, res, next) {
    var email = req.session.user.email;
    UserDetail.findOne({ userEmail: email }, function (err, doc) {
        if (doc) {
            responseData.code = 200;
            responseData.userDetail = doc;
        } else {
            responseData.code = 404;
        }
        res.json(responseData);
        return;
    })
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
    users.findOne({
        email:email
    },function (err,doc) {
        if(doc && doc.password == password) {
            responseData.code = 200;
            responseData.message = doc;
            req.session.user = doc;
        } else if(!doc) {
            //not exist
        	responseData.code = 400;
        } else {
            //wrong input
        	responseData.code = 500;
        }
        res.json(responseData);
        return;
    });
});

module.exports = router;
