/**
 * Created by Linwei on 2017/3/16.
 */
var co = require("co");
var config = require("../config");
var connection = require("./connection");

let model = {};

co(function *() {
    try{
        //游戏主体用户表
        model.exdUser = connection.rhythmDB.qDefine("exd_user", {
            userId: {type: 'text', key: true},
            password: String,
            email: String,
            sex: String,
            birthDay: {type: "date", time: false},
            locateProvince: String,
            locateCity: String,
            locateDistrict: String,
            locateCountry: String,
            phoneNumber: String,
            avatar: String
        });
        model.authCode = connection.rhythmDB.qDefine("auth_code", {
            codeId: {type: 'text', key: true},
            userId: String,
            expirationTime: {type: "date", time: true},
            type: Number
        });
        connection.rhythmDB.qSync();
        module.exports = model;
    }
    catch (err){
        console.log("数据库表创建错误:"+err);
    }
});