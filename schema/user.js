//导入定义验证规则的包
const joi = require("joi");
// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
// 定义id，nickname,email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
// 定义验证avatar头像的验证规则
const avatar = joi.string().dataUri().required();
// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
        body: { username, password }
    }
    // 验证规则对象-更新用户基本信息
exports.update_userinfo_schema = {
        // 需要对req.body里面的数据进行验证
        body: {
            id,
            nickname,
            email
        }
    }
    // 验证规则对象-重置密码
exports.update_password_schema = {
        body: {
            //使用password这个规则，验证req.body.oldPwd的值
            oldPwd: password,
            // 使用joi.not(joi.ref("oldPwd")).concat(password)规则，验证req.body.newPwd的值
            //解读：1、joi.ref("oldPwd")表示newPwd的值必须和oldPwd的值保持一致
            //2、joi.not(joi.ref("oldPwd"))表示newPwd的值不能等于oldPwd的值
            //3、.concat()用于合并joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
            newPwd: joi.not(joi.ref("oldPwd")).concat(password)
        }
    }
    // 验证规则对象- 更新头像的路由
exports.update_avatar_schema = {
    body: {
        avatar
    }
}