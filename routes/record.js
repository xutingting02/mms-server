import record from '../controllers/record.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/add', record.addRecord)
router.post('/delete', record.deleteRecord)
router.get('/get', record.getRecordById)
router.get('/list', record.getRecords)

export default router
