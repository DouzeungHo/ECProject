var mongoose = require('mongoose');

// 用户细节数据结构
module.exports = new mongoose.Schema({
    // 用户邮箱
    userEmail: String,
    //real Name
    userName: String,
    //语言
    selectedLanguages: Array,
    //性别
    sex: String,
    //Province
    detailProvince: String,
    //city
    detailCity: String,
    //ID
    detailID: String,
    //TODO:Date
    registerDate: Date,
    //Phone
    detailPhone: String,
    //TODO:Self intro
    selfIntroduction: String
    //
})