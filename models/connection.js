/**
 * Created by john_ on 2017/1/21.
 */
var orm = require("orm");
var qOrm = require("q-orm");
var co = require("co");
var config = require("../config");

co(function*() {
    try {
        orm.settings.set("connection.pool", true);
        orm.settings.set("connection.debug", true);
        module.exports = qOrm.qConnect('mysql://' + config.DB_USER + ':' +
            config.DB_PASSWORD + '@' + config.DB_HOST + '/' + config.RHYTHM_DB);
    }
    catch (err) {
        console.log("数据库链接出错:"+err)
    }
});