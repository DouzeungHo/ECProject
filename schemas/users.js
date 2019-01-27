var mongoose = require('mongoose');

// 用户数据结构
module.exports = new mongoose.Schema({
    // 用户名
    username:String,
    // 密码
    password:String,
    //用户地
    location:String,
    //Email
    email:String
})