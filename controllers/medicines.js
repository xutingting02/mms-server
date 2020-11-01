import medicines from '../models/medicines.js'

const getMedicineById = async function (ctx) {
    const id = ctx.query.id
    const result = await medicines.getMedicineById(id)
    ctx.body = result
}

const getMedicines = async function (ctx) {
    const data = ctx.query
    const medicinesArr = await medicines.getMedicines(data)
    ctx.body = {
        success: true,
        data: medicinesArr,
        totalSize: 20
    }
}

const addMedicine = async function (ctx) {
    const data = ctx.request.body
    await medicines.addMedicine(data.data).catch(err => {
        ctx.throw(500)
    })
    ctx.body = {
        success: true
    }
}

const deleteMedicine = async function (ctx) {
    const id = ctx.request.body.id
    await medicines.deleteMedicine(id).catch(err => {
        ctx.throw(500)
    })
    ctx.body = {
        success: true
    }
}

const updateMedicine = async function (id, number) {
    await medicines.updateMedicine(id, number).catch(err => {
        ctx.throw(500)
    })
    ctx.body = {
        success: true
    }
}

export default {
    getMedicines,
    getMedicineById,
    addMedicine,
    deleteMedicine,
    updateMedicine
}
