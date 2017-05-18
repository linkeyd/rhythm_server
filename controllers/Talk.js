/**
 * Created by john_ on 2017/5/27.
 */
var orm = require('orm');
var qOrm = require('q-orm');
var tools = require('../tools/tools');
var resStatusCode = require('../tools/resStatusCode');
let formidable = require('formidable');
let fs = require('fs');
let TITLE = '上传成功 ';
let AVATAR_UPLOAD_FOLDER = '/images/';
var co = require("co");

import {bbsTalk,bbsUser,exdUser,bbsComment,bbsPicture} from '../models/model'
class Talk {
    constructor(){

    }
    talkSelect(req,res,next){
        co(function*(){
            try{
                var game = req.query.game;
                var data = [];
                var talkResult = yield bbsTalk.qAll();
                for(var i=0;i<talkResult.length;i++){
                    var exdResult = yield exdUser.qGet(talkResult[i].userId);
                    var bbsResult = yield bbsUser.qGet(talkResult[i].userId);
                    var bbsImages = yield bbsPicture.qAll({
                       talkId:talkResult[i].talkId
                    });
                    data[i] = {
                        talk:talkResult[i],
                        exdUser:exdResult,
                        bbsUser:bbsResult,
                        images:bbsImages
                    }
                }

                resStatusCode(res,200,data);
            }catch (err){
                console.log(err);
            }

        });

    }
    talkPerson(req,res,next){
        co(function*(){
        try{
            var userId = req.body.userId;
            var data = [];
            var talkResult = yield bbsTalk.qAll({
                userId
            });
            for(var i=0;i<talkResult.length;i++){
                var bbsImages = yield bbsPicture.qAll({
                    talkId:talkResult[i].talkId
                });
                data[i] = {
                    talk:talkResult[i],
                    images:bbsImages
                }
            }

            resStatusCode(res,200,data);
        }
        catch (err){
          console.log(err);
        }
        });
    }
    talkAdd(req,res,next){
               var form = new formidable.IncomingForm();   //创建上传表单
               form.encoding = 'utf-8';        //设置编辑
               form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
               form.keepExtensions = true;     //保留后缀
               form.maxFieldsSize = 30 * 1024 * 1024;   //文件大小
               var maxSize = 30 * 1024 *1024;
               form.parse(req, function (err, fields, files) {
                  co(function*(){
                     try{
                         var userId = fields.userId;
                         var content = fields.content;
                         var game = fields.game;
                         console.log(fields.userId);

                         if (err) {
                             res.locals.error = err;
                             console.log(err);
                             resStatusCode(res,1403,err);
                             return;
                         }

                         if(isEmptyObject(files)){
                             var extName = '';  //后缀名
                             switch (files.images.type) {
                                 case 'image/pjpeg':
                                     extName = 'jpg';
                                     break;
                                 case 'image/jpeg':
                                     extName = 'jpg';
                                     break;
                                 case 'image/png':
                                     extName = 'png';
                                     break;
                                 case 'image/x-png':
                                     extName = 'png';
                                     break;
                             }

                             if (extName.length == 0) {
                                 res.locals.error = '只支持png和jpg格式图片';
                                 resStatusCode(res,1404,'只支持png和jpg格式图片')
                                 return;
                             }
                             var imagesName = Date.parse(new Date()) + '.' + extName;
                             var newPath = form.uploadDir + imagesName;
                             var dirPath = 'uploadFile/' + imagesName;
                             yield bbsPicture.qCreate({
                                 userId,
                                 url:dirPath
                             });
                             fs.renameSync(files.images.path, newPath);  //重命名
                         }

                         let result = yield bbsTalk.qCreate({
                             userId,
                             content,
                             game,
                             time: new Date()
                         });
                         console.log(result);
                         resStatusCode(res,200);
                     }
                     catch (err){
                         console.log(err);
                     }
                  })
               });
               form.on('fileBegin', function(name, file){
                   if(form.bytesExpected > maxSize)
                   {
                       this.emit('error', '文件大小不能超过10M');
                       resStatusCode(res,1405,'文件大小不能超过10M')
                   }
               });

    }
    talkDelete(req,res,next){
          co(function*(){
             try {
                 var talkId = req.body.talkId;
                 var talkDelete = yield bbsTalk.qGet(talkId);
                 talkDelete.qRemove();
                 resStatusCode(res,200);
             }catch (err){
                 console.log(err);
             }
          });
    }
    commentSelect(req,res,next){
        co(function*(){
           try{
               let body = req.body;
               let talkId = body.talkId;
               console.log(talkId);
               let commentResult = yield bbsComment.qAll({
                   talkId
               });
               console.log(commentResult);
               var data =[];
               for(var i=0;i<commentResult.length;i++) {
                   var exdResult = yield exdUser.qGet(commentResult[i].userId);
                   var bbsResult = yield bbsUser.qGet(commentResult[i].userId);
                   data[i] = {
                       comment:commentResult[i],
                       exdUser:exdResult,
                       bbsUser:bbsResult
                   }
               }
               resStatusCode(res,200,data);
           }catch (err){
               console.log(err);
           }
        });
    }
    commentAdd(req,res,next){
        co(function*(){
           try{
            let body = req.body;
            console.log(body);
            let talkId = body.talkId;
            let userId = body.userId;
            let content = body.content;
            yield bbsComment.qCreate({
                talkId,
                userId,
                content,
                time:new Date()
            });

            resStatusCode(res,200);
           } catch (err){
               console.log(err);
           }
        });
    }
    commentDelete(req,res,next){
        co(function*(){
            try {

            }catch (err){
                console.log(err);
            }
        })
    }
    talkLike(req,res,next){

    }
    talkComplaints(req,res,next){

    }
}


let isEmptyObject=(obj)=> {
    let key;
    for(key in obj) {
        return true;
    }
    return false;
};
module.exports = new Talk();