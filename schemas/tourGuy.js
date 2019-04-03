var mongoose = require('mongoose');

// 导览数据结构
module.exports = new mongoose.Schema({
    // 用户邮箱, key
    userEmail: String,
    //School
    detailSchool: String,
    //State
    detailState: String,
    //City note: different from user city
    detailUSCity: String,
    //Payment
    desiredSalary: Number,
    //addr
    detailAddr: String,
    //transport
    maximumNum: Number,
    //vehicle
    vehicle: String,
    //verified
    verified: Boolean
})