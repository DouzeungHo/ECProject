var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs')

router.get('/city', function(req, res, next) {
	var file = path.join(__dirname, '../public/resources/city.json'); 
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            //res.send('文件读取失败');
        } else {
        	var cities = JSON.parse(data);
            res.json(cities);
        }
    });
});
//crtl+c +v
router.get('/country', function(req, res, next) {
    var file = path.join(__dirname, '../public/resources/world-country.json'); 
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            //res.send('文件读取失败');
        } else {
            var countries = JSON.parse(data);
            res.json(countries);
        }
    });
});
//crtl+c +v
router.get('/usCities', function(req, res, next) {
    var file = path.join(__dirname, '../public/resources/US_States_and_Cities.json'); 
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            //res.send('文件读取失败');
        } else {
            var us_cities = JSON.parse(data);
            res.json(us_cities);
        }
    });
});

module.exports = router;