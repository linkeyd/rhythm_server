/**
 * Created by john_ on 2017/1/21.
 */
var orm = require("orm");
var qOrm = require("q-orm");
var co = require("co");
var config = require("../config");
var connection = {};
co(function*() {
    try {
        qOrm.settings.set("connection.pool", true);
        qOrm.settings.set("connection.debug", true);
        connection.webDB = yield qOrm.qConnect('mysql://' + config.DB_USER + ':' + config.DB_PASSWORD + '@' + config.DB_HOST + '/' + config.WEB_DB);
        connection.rhythmDB = yield qOrm.qConnect('mysql://' + config.DB_USER + ':' + config.DB_PASSWORD + '@' + config.DB_HOST + '/' + config.RHYTHM_DB);
        module.exports = connection;
    }
    catch (err) {
        console.log("数据库链接出错:"+err)
    }
});