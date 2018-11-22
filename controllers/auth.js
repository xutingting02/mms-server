import auth from '../models/auth.js'
// 计算token
import jwt from 'jsonwebtoken'
// 密码加密处理
import bcrypt from 'bcryptjs'

// 获取某个用户信息
const getUserInfo = async function (ctx) {
  const id = ctx.params.id
  const result = await auth.getUserById(id)
  ctx.body = result
}

// 登录
const userLogin = async function (ctx) {
  const data = ctx.request.body
  const userInfo = await auth.getUserByName(data.username)
  if (userInfo != null) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false,
        message: '密码错误！'
      }
    }
    else {
        const userToken = {
            name: userInfo.user_name,
            id: userInfo.id
        }
        const secret = 'vue-koa-demo'
        const token = jwt.sign(userToken, secret)
        ctx.body = {
            success: true,
            token: token
        }
    }
  }
  else {
    ctx.body = {
        success: false,
        message: '用户不存在adsa！'
    }
  }

}

// 注册
const userRegister = async function (ctx) {
  const data = ctx.request.body
  try {
    if (!data.username || !data.password) {
      ctx.status = 400
      ctx.body = {
        success: false,
        message: '用户名密码不能为空'
      }
      return
    }
    data.password = await bcrypt.hash(data.password, 5)
    let userInfo = await auth.getUserByName(data.username)
    if (!userInfo) {
      await auth.addUser(data)
      ctx.status = 200
      ctx.body = {
        success: true,
        message: '注册成功'
      }
    }
    else {
      ctx.status = 406
      ctx.body = {
        success: false,
        message: '用户名已经存在'
      }
    }
  }
  catch (err) {
    ctx.throw(500)
  }
}

export default {
  getUserInfo,
  userLogin,
  userRegister
}
