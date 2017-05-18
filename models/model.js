/**
 * Created by john_ on 2017/4/19.
 */
var orm = require("orm");
var qOrm = require("q-orm");
var co = require("co");
var connection = require('./connection');

co(function*(){
try{
    connection = yield connection;
    exports.exdUser = connection.qDefine("exd_user", {
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
    exports.authCode = connection.qDefine("auth_code", {
        codeId: {type: 'text', key: true},
        userId: String,
        expirationTime: {type: "date", time: true},
        type: Number
    });
    //说说的用户资料表
    exports.bbsUser = connection.qDefine("bbs_user", {
        userId: {type: 'text', key: true},
        exp: Number,
        currency: Number,
        signature: String,
        status: {type: 'text',big: true}
    });
    //说说好友
    exports.bbsFriend = connection.qDefine('bbs_friend', {
        id: {type: 'serial', key: true},
        userId: {type: 'text'},
        friendId: {type: 'text'},
        addTime: Date
    });
    //存放说说
    exports.bbsTalk = connection.qDefine('bbs_talk', {
        id: {type: 'serial', key: true},
        userId: {type: 'text'},
        time: Date,
        content: {type: 'text', big: true},
        game:{type:'text'}
    });
    //用于对说说的评论
    exports.bbsComment = connection.qDefine('bbs_comment', {
        id: {type: 'serial', key: true},
        talkId:{type: 'integer'},
        userId: {type: 'text'},
        commentId:{type: 'text'},
        time: Date,
        content: {type: 'text', big: true}
    });
    //存放说说的图片表
    exports.bbsPicture = connection.qDefine('bbs_picture',{
        id : {type: 'serial', key: true},
        talkId:{type: 'integer'},
        url : {type:'text'}
    });
    //点赞或者投诉表，根据type来判定
    exports.bbsFeature = connection.qDefine('bbs_feature',{
        id : {type: 'serial', key: true},
        talkId:{type: 'integer'},
        type : {type:'text'}
    });
    exports.bbsGameList = connection.qDefine('bbs_gameList',{
        id : {type: 'serial', key: true},
        title : {type:'text'},
        url:{type:'text'},
        content:{type: 'text', big: true}
    });
    exports.bbsSystemNotice = connection.qDefine('bbs_systemNotice',{
        id : {type: 'serial', key: true},
        time : Date,
        userId : {type:'text'},
        content: {type: 'text', big: true}
    });
    exports.bbsSignIn = connection.qDefine('bbs_signIn',{
        id : {type: 'serial', key: true},
        time:Date,
        userId :{type:'text'}
    });
    connection.qSync();
}
catch (err){
  console.log(err);
}
});