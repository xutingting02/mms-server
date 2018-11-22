import auth from '../controllers/auth.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/login', auth.userLogin)
router.post('/register', auth.userRegister)

export default router
