import sale from '../controllers/sale.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/add', sale.addSale)
router.post('/delete', sale.deleteSale)
router.get('/get', sale.getSaleById)
router.get('/list', sale.getSales)

export default router
