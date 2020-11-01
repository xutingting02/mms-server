import purchase from '../controllers/purchase.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/add', purchase.addPurchase)
router.post('/delete', purchase.deletePurchase)
router.get('/get', purchase.getPurchaseById)
router.get('/list', purchase.getPurchases)

export default router
