/**
 * Created by john_ on 2017/1/21.
 */
var crypto = require('crypto');
class SessionSetting {
    constructor() {

    }

    config() {
        var hour = 3600000;
        var expire = new Date(Date.now() + hour);
        const session = {
            secret: 'rhythm',
            name: 'userPath',
            resave: false,
            saveUninitialized: true,
            expires: expire,
            cookie: {maxAge: hour}
        };
        return session;
    }

    tokenValidation(req, res, next) {
        var token = crypto.createHash('md5').update("rhythmBBS").digest('base64');
        if(req.session.token){
            console.log("There are token:"+req.session.token);
            next();
        }
        else if(req.body.token == token || req.query.token == token){
            console.log("Save the correct token:"+token);
            req.session.token = token;
            next();
        }
        else{
            res.json({"status":1001,"message":"Authentication information error"})
        }
    }
    userValidation(req,res,next){
        if(req.session.username){
            next();
        }
        else{
            res.json({"status":1002,"message":"Username not found"});
        }
    }
}
module.exports = new SessionSetting();
