/**
 * Created by john_ on 2017/1/24.
 */
module.exports = function(res,status,data){
    let message = (typeof data)=='object' ? data : _errorCodeMessage[status];
    let success = status == 200 ? true : false;
    res.status(status).json({
        success,
        message
    });
};
const _errorCodeMessage = {
    "200": "success ",
    "1001":"用户名不存在",
    "1002":"密码错误",
    "1004":"请输入用户名",
    "1005":"请输入密码",
    "1103":"密码输入错误多次",
    "1104": "用户名只允许输入数字字母下划线",
    "1105": "账号不允许为空",
    "1106": "邮箱不允许为空",
    "1107": "两次密码检查不一致",
    "1108": "密码不允许为空",
    "1101": "用户已存在",
    "1109": "用户名长度小于6位",
    "1110": "用户名长度大于30位",
    "1111": "密码小于7位",
    "1112": "请输入正确的邮箱地址",
    "1301":"邮箱或者账号错误",
    "1201":"验证码失效",
    "1302": "用户未登陆",
    "1401": "今日已签到"

};