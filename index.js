import Koa from 'koa'
import Router from 'koa-router'
import auth from './routes/auth.js'
import patient from './routes/patient.js'
import record from './routes/record.js'
import report from './routes/report.js'


import koaBodyparser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'

import path from 'path'
import serve from 'koa-static'
import jwt from 'koa-jwt'

import mongoose from 'mongoose'
mongoose.connect('mongodb://127.0.0.1:27017/mms', {useNewUrlParser: true})

const app = new Koa()
const router = Router()

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

// 对请求进行权限校验
app.use(jwt({ secret: 'vue-koa-demo' }).unless({ path: [/^\/auth/] }));

router.use('/auth', auth.routes())
router.use('/patients', patient.routes())
router.use('/records', record.routes())
router.use('/report', report.routes())
app.use(router.routes())

export default app.listen(8081, () => {
    console.log('Koa is listening in 8081')
})
