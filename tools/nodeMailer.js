/**
 * Created by Linwei on 2017/4/5.
 */
var nodemailer = require('nodemailer');
var config = require('../config');
//载入方法主题
var emailSend = {};

//邮箱信息配置
var mailTransport = nodemailer.createTransport('SMTP', {
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: true,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD
    }
});

//发送Email
var sendEmail = function (ops) {
    var mailOptions = {
        from: '"EXD Support" <support@exdstudio.net>',
        to: ops.email,
        subject: ops.title,
        html: ops.html,
    };
    mailTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("成功发送邮件: " + response.message);
        }
    });
};

//用户注册发送邮箱
emailSend.regeditEmail = function (userId, nickName, email) {
    var ops = {};
    ops.email = email;
    ops.title = "EXD账户注册成功";
    ops.html = "<meta http-equiv='Content-Type' content='text/html;charset=UTF-8'><body><style type='text/css'>.title {line - height:80px; padding-left:30px; padding-top:20px;}body {font - family:'微软雅黑', '黑体', '宋体', 'Microsoft Sans Serif', 'MS Sans Serif';}.titlebg { background - color:#00ABE8; height:80px;}</style><table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr class='titlebg'><td width='10'></td><td class='title'><h1>恭喜您！EXD 账户注册成功！</h1></td><td></td></tr><tr height='50'><td></td><td></td><td></td></tr><tr><td></td><td style='padding-left:20px; padding-right:20px;'><p>尊敬的用户：" + userId + "</p><p>感谢您注册EXD账户，您的注册信息如下：</p><table cellspacing='0' cellpadding='0' style='min-width:300px; padding-top:30px; padding-bottom:30px; border-top:1px solid #007CFF; border-bottom:1px solid #007CFF;'><tbody><tr><td><p>用户ID：" + userId + "</p><p>注册邮箱：" + email + "</p></td></tr></tbody></table><p>您可以通过我们的用户账户中心修改您的密码，或者使用您的注册邮箱找回您的用户名。</p><p>再次提醒您，此邮箱为密保邮箱，所有您账户的敏感操作都将通过此邮箱发送验证码。 请您保护好您的邮箱！</p></td><td></td></tr><tr height='50'><td></td><td></td><td></td></tr><tr bgcolor='#00ABE8' height='40'><td></td><td align='right'><p style='font-size:12px;'>EXD账户中心 - ExtraDimension</p></td><td width='10'></td></tr></tbody></table></body>";

    sendEmail(ops);
};
//用户修改密码邮箱
emailSend.userPasswordUpdate = function (email, userId, checkCode) {
    var ops = {};
    var link = setting.EMAIL_LOCATION+"/emailUpdate/passwordEmailChange.html?code="+checkCode;
    ops.email = email;
    ops.title = "EXD账户重置链接";
    ops.html = '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><body><style type="text/css">.title {line - height:80px; padding-left:30px; padding-top:20px;}body {font - family:"微软雅黑", "黑体", "宋体", "Microsoft Sans Serif", "MS Sans Serif";}</style><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr bgcolor="#00ABE8"><td width="10"></td><td class="title"><h1>EXD 账户重置链接！</h1></td><td></td></tr><tr height="50"><td></td><td></td><td></td></tr><tr><td></td><td style="padding-left:20px; padding-right:20px;"><p>尊敬的用户：' + userId + '</p><p>您的重置密码链接如下：</p><table cellspacing="0" cellpadding="0" style="min-width:300px; padding-top:30px; padding-bottom:30px; border-top:1px solid #007CFF; border-bottom:1px solid #007CFF;"><tbody><tr><td><p><a href="' + link + '">点此重置密码</a></p></td></tr></tbody></table><p>此链接有效时间为15分钟，请在有效时间内完成验证，超时后请重新获取重置链接。</p><p>如果此次操作不是您请求的，请及时查看您的安全信息!</p></td><td></td></tr><tr height="50"><td></td><td></td><td></td></tr><tr bgcolor="#00ABE8" height="40"><td></td><td align="right"><p style="font-size:12px;">EXD账户中心 - ExtraDimension</p></td><td width="10"></td></tr></tbody></table></body>';

    sendEmail(ops);
};
//用户邮箱信息修改
emailSend.emailInformationUpdate = function (email,userId,checkCode) {
    var ops = {};
    var link = setting.EMAIL_LOCATION+"/emailUpdate/emailChange.html?code="+checkCode;
    ops.email = email;
    ops.title = "EXD账户邮箱更改链接";
    ops.html = '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><body><style type="text/css">.title {line - height:80px; padding-left:30px; padding-top:20px;}body {font - family:"微软雅黑", "黑体", "宋体", "Microsoft Sans Serif", "MS Sans Serif";}</style><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr bgcolor="#00ABE8"><td width="10"></td><td class="title"><h1>EXD 账户邮箱更改链接！</h1></td><td></td></tr><tr height="50"><td></td><td></td><td></td></tr><tr><td></td><td style="padding-left:20px; padding-right:20px;"><p>尊敬的用户：' + userId + '</p><p>您的更改邮箱链接如下：</p><table cellspacing="0" cellpadding="0" style="min-width:300px; padding-top:30px; padding-bottom:30px; border-top:1px solid #007CFF; border-bottom:1px solid #007CFF;"><tbody><tr><td><p><a href="' + link + '">点此更改邮箱</a></p></td></tr></tbody></table><p>此链接有效时间为15分钟，请在有效时间内完成验证，超时后请重新获取重置链接。</p><p>如果此次操作不是您请求的，请及时查看您的安全信息!</p></td><td></td></tr><tr height="50"><td></td><td></td><td></td></tr><tr bgcolor="#00ABE8" height="40"><td></td><td align="right"><p style="font-size:12px;">EXD账户中心 - ExtraDimension</p></td><td width="10"></td></tr></tbody></table></body>';

    sendEmail(ops);
};
//发送错误信息提交管理员
emailSend.manageEmaiSend = function(email,errorCode,errmessage){
    var ops = {};
    ops.email = email;
    ops.title = "超维度网站错误信息 - "+errorCode;
    ops.html = "<meta http-equiv='Content-Type' content='text/html;charset=UTF-8'><body><style type='text/css'>.title {line - height:80px; padding-left:30px; padding-top:20px;}body {font - family:'微软雅黑', '黑体', '宋体', 'Microsoft Sans Serif', 'MS Sans Serif';}.titlebg { background - color:#00ABE8; height:80px;}</style><table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr class='titlebg'><td width='10'></td><td class='title'><h1>超维度网站错误信息</h1></td><td></td></tr><tr height='50'><td></td><td></td><td></td></tr><tr><td></td><td style='padding-left:20px; padding-right:20px;'><p>错误信息如下：</p><table cellspacing='0' cellpadding='0' style='min-width:300px; padding-top:30px; padding-bottom:30px; border-top:1px solid #007CFF; border-bottom:1px solid #007CFF;'><tbody><tr><td><p>" + errmessage + "发生时间："+ new Date() +"</p></td></tr></tbody></table><p>此信息由系统自动发送，请勿回复。</p></td><td></td></tr><tr height='50'><td></td><td></td><td></td></tr><tr bgcolor='#00ABE8' height='40'><td></td><td align='right'><p style='font-size:12px;'>EXD账户中心 - ExtraDimension</p></td><td width='10'></td></tr></tbody></table></body>";

    sendEmail(ops);
};

module.exports = emailSend;
