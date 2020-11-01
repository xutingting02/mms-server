import medicines from '../controllers/medicines.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/add', medicines.addMedicine)
router.post('/delete', medicines.deleteMedicine)
router.get('/get', medicines.getMedicineById)
router.get('/list', medicines.getMedicines)

export default router
