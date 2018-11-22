import report from '../controllers/report.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/income', report.getIncomeList)

export default router
