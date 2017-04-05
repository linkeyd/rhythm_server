/**
 * Created by Linwei on 2017/3/16.
 */
var co = require("co");
var config = require("../config");
var connection = require("./connection");

let model = {};

co(function*(){
    try{
        //说说的用户资料表
        model.bbsUser = connection.webDB.qDefine("bbs_user", {
            userId: {type: 'text', key: true},
            exp: Number,
            currency: Number,
            signature: String,
            status: {type: 'text',big: true}
        });
        //说说好友
        model.bbsFriend = connection.webDB.qDefine('bbs_friend', {
            id: {type: 'serial', key: true},
            userId: {type: 'text'},
            friendId: {type: 'text'},
            addTime: Date
        });
        //存放说说
        model.bbsTalk = connection.webDB.qDefine('bbs_talk', {
            id: {type: 'serial', key: true},
            userId: {type: 'text'},
            time: Date,
            content: {type: 'text', big: true},
            game:{type:'text'}
        });
        //用于对说说的评论
        model.bbsComment = connection.webDB.qDefine('bbs_comment', {
            id: {type: 'serial', key: true},
            talkId:Number,
            userId: {type: 'text'},
            commentId:{type: 'text'},
            time: Date,
            content: {type: 'text', big: true}
        });
        //存放说说的图片表
        model.bbsPicture = connection.webDB.qDefine('bbs_picture',{
            id : {type: 'serial', key: true},
            talkId : Number,
            url : {type:'text'}
        });
        //点赞或者投诉表，根据type来判定
        model.bbsFeature = connection.webDB.qDefine('bbs_feature',{
            id : {type: 'serial', key: true},
            talkId:Number,
            type : {type:'text'}
        });
        model.bbsGameList = connection.webDB.qDefine('bbs_gameList',{
            id : {type: 'serial', key: true},
            title : {type:'text'},
            url:{type:'text'},
            content:{type: 'text', big: true}
        });
        model.bbsSystemNotice = connection.webDB.qDefine('bbs_systemNotice',{
            id : {type: 'serial', key: true},
            time : Date,
            userId : {type:'text'},
            content: {type: 'text', big: true}
        });
        model.bbsSignIn = connection.webDB.qDefine('bbs_signIn',{
            id : {type: 'serial', key: true},
            time:Date,
            userId :{type:'text'}
        });
        connection.webDB.qSync();
        module.exports = model;
    }
    catch (err){
        console.log("建表语句错误:"+err);
    }
});