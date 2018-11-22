import patient from '../controllers/patient.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/add', patient.addPatient)
router.post('/delete', patient.deletePatient)
router.get('/get', patient.getPatientById)
router.get('/list', patient.getPatients)

export default router
