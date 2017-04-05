/**
 * Created by john_ on 2017/1/24.
 */

var express = require('express');
var router = express.Router();
var orm = require('orm');
var qOrm = require('q-orm');
var co = require('co');
var crypto = require('crypto');
var webModel = require('../models/webDB');
var rhythmModel = require('../models/rhythmDB');
var resStatusCode = require('../tools/resStatusCode');
var tools = require('../tools/tools');
var nodeMailer = require('../tools/nodeMailer');
class User {
    constructor() {

    }

    login(req, res, next) {
        co(function*() {
            try {
                //前端req给服务端账号密码
                var username = req.body.username;
                var password = crypto.createHash('md5').update(req.body.password).digest('base64');
                //mysql 查找id
                var loginResult = yield rhythmModel.exdUser.qAll({
                    userId: username
                });
                //账号不存在
                if (!loginResult.length) {
                    resStatusCode(res, 1001);
                }
                //密码不正确
                else if (password != loginResult[0].password) {
                    resStatusCode(res, 1002);
                }
                else {
                    //查找bbs数据库里有没有用户信息如果没有创建一条用户信息
                    var bbsLoginResult = yield webModel.bbsUser.qGet(username);
                    if (tools.isEmptyObject(bbsLoginResult)) {
                        yield webModel.bbsUser.qCreate({
                            userId: username,
                            exp: 0,
                            currency: 0,
                            signature:""
                        });
                    }
                    req.session.username = loginResult[0].userId;
                    resStatusCode(res, 200);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    register(req,res,next){
    co(function*(){
        try{
            var body = req.body;
            var password = crypto.createHash('md5').update(req.body.password).digest('base64');
            var passwordCheck = crypto.createHash('md5').update(req.body.checkPassword).digest('base64');
            //非法字符账号
            var illegalChar = /^[A-Za-z0-9_-]+$/;
            //账号为空
            if (body.username === '' || body.username == 'undefined') {
                resStatusCode(res, 1105);
            }
            //账号非法字符
            else if (!illegalChar.test(body.username)) {
                resStatusCode(res, 1104);
            }
            //密码和检查密码不一致
            else if (password != passwordCheck) {
                resStatusCode(res, 1107);
            }
            //邮箱为空
            else if (body.email === '') {
                resStatusCode(res, 1106);
            }
            else{
                //生日为空赋值
                if (body.birthDay === '') {
                    body.birthDay = new Date();
                }
                //数据库添加
                yield rhythmModel.exdUser.qCreate({
                    userId: body.username,
                    password: password,
                    email: body.email,
                    sex: body.sex,
                    birthDay: body.birthDay,
                    phoneNumber: body.phoneNumber,
                    avatar: 'avatar/default.png'
                });
                yield webModel.bbsUser.qCreate({
                    userId: body.username,
                    exp: 0,
                    currency: 0,
                    signature:""
                });
                nodeMailer.regeditEmail(body.username,body.email);
                resStatusCode(res,200);
            }
        }
        catch(err){
            res.json(err);
        }
    });
    };
    passwordUpdate(req, res, next) {
        co(function*() {
            try {
                var username = req.session.username;
                var password = crypto.createHash('md5').update(req.body.password).digest('base64');
                var newPass = crypto.createHash('md5').update(req.body.newPass).digest('base64');
                var resultPsw = yield rhythmModel.exdUser.qAll({
                    userId: username,
                    password: password
                });
                if (resultPsw.length) {
                    var update = yield rhythmModel.exdUser.qGet(username);
                    update.password = newPass;
                    update.qSave();
                    resStatusCode(res, 200);
                }
                else {
                    resStatusCode(res, 1002);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }

    personalDetails(req, res, next) {
        co(function*() {
            try {

                var userSelect = yield rhythmModel.exdUser.qGet(req.session.username);
                var bbsSelect = yield webModel.bbsUser.qGet(req.session.username);
                if (userSelect) {
                    resStatusCode(res, 200, [userSelect, bbsSelect]);
                }
            }
            catch (err) {
                // console.log(err);
                // 没有登陆
                resStatusCode(res, 1301);
            }
        });
    }

    peronalUpdate(req, res, next) {
        co(function*() {
            try {
                var username = req.session.username;
                var phoneNumber = req.body.phoneNumber;
                var birthDay = req.body.birthDay;
                var sex = req.body.sex;
                var locateProvince = req.body.locateProvince;
                var locateCity = req.body.locateCity;
                var locateDistrict = req.body.locateDistrict;
                var update = yield db.exdUserModel.qGet(username);
                update.phoneNumber = phoneNumber;
                update.birthDay = birthDay;
                update.sex = sex;
                update.locateProvince = locateProvince;
                update.locateCity = locateCity;
                update.locateDistrict = locateDistrict;
                update.qSave();

                var updateBbs = yield db.bbsUser.qGet(username);
                updateBbs.nickname = req.body.nickname;
                updateBbs.status = req.body.status;
                updateBbs.qSave();
                resStatusCode(res, 200);
            }
            catch (err) {
                console.log(err);
            }
        })
    }

    avatarUpdate(req, res, next) {

    }

    signInAdd(req, res, next) {
        //游戏币
        var currency = 2;
        var username = req.session.username;
        var bbsUsername = yield db.bbsUser.qGet(username);
        var date = new Date();
        var bbsSignIn = yield db.bbsSignIn.qFind({
            userId:username
        }).orderRaw("?? DESC",['time']);

        var thisDate = new Date(bbsSignIn[0].time);
        if (thisDate.getDate() == date.getDate()) {
            resStatusCode(res, 1401);
        }
        else {
            if (tools.isEmptyObject(bbsUsername)) {
                bbsUsername.currency += currency;
                bbsUsername.qSave();
                yield db.bbsSignIn.qCreate({
                    time:date,
                    userId :username
                });
                resStatusCode(res,200);
            }

        }


    }
}
module.exports = new User();