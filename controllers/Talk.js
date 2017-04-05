/**
 * Created by john_ on 2017/1/24.
 */
var orm = require('orm');
var qOrm = require('q-orm');
var tools = require('../tools/tools');
var resStatusCode = require('../tools/resStatusCode');
var co = require("co");
var db = require("../models/connection");
class Talk {
    constructor(){

    }
    talkSelect(req,res,next){
        co(function*(){
            try{
                var game = req.query.game;
                var page = req.query.page;
                var talkResult = yield db.bbsTalk.qFind({
                    game:game
                }).limit(10).offset(page);
                resStatusCode(res,200,talkResult);
            }catch (err){
                console.log(err);
            }

        });

    }
    talkAdd(req,res,next){
        co(function*(){
           try {
             var username = req.session.username;
             var content = req.body.content;
             var game = req.body.game;
             db.bbsTalk.qCreate({
                 userId: username,
                 time: new Date(),
                 content : content,
                 game : game
             });
             resStatusCode(res,200);
           }catch (err){
             console.log(err);
           }
        });
    }
    talkDelete(req,res,next){
          co(function*(){
             try {
                 var id = req.body.id;
                 var talkDelete = yield db.bbsTalk.qGet(id);
                 talkDelete.qRemove();
                 var commentDelete = yield db.bbsComment.qAll({
                    talkId:id
                 });
                 for(var i=0;i<commentDelete.length;i++){
                     commentDelete[i].qRemove();
                 }
                 resStatusCode(res,200);
             }catch (err){
                 console.log(err);
             }
          });
    }
    commentSelect(req,res,next){
        co(function*(){
           try{
               var talkId = req.query.id;
               var page = req.query.page;
               var commentResult = yield db.bbsComment.qFind({
                   talkId:talkId
               }).limit(10).offset(page);
               resStatusCode(res,200,commentResult);
           }catch (err){
               console.log(err);
           }
        });
    }
    commentAdd(req,res,next){
        co(function*(){
           try{

           } catch (err){
               console.log(err);
           }
        });
    }
    commentDelete(req,res,next){

    }
    talkLike(req,res,next){

    }
    talkComplaints(req,res,next){

    }
}
module.exports = new Talk();