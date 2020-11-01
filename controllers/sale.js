import sale from '../models/sale.js'
import medicines from '../models/medicines.js'

const getSaleById = async function (ctx) {
    const id = 3;
    const result = await sale.getSaleById(id)
    ctx.body = result
}

const getSales = async function (ctx) {
    const data = ctx.query
    const arr = await sale.getSales(data)
    ctx.body = {
        success: true,
        data: arr,
        totalSize: 20
    }
}

const addSale = async function (ctx) {
    const data = ctx.request.body.data
    await sale.addSale(data).catch(err => {
        ctx.throw(500)
    })

    for (let item of data) {
        const {number} = await medicines.getMedicineById(item.medicine);
        await medicines.updateMedicine(item.medicine, number - item.number);
    }

    ctx.body = {
        success: true
    }
}

const deleteSale = async function (ctx) {
    const id = ctx.request.body.id
    const {number, medicine} = await sale.getSaleById(id)
    const data = await medicines.getMedicineById(medicine);
    await sale.deleteSale(id).catch(err => {
        ctx.throw(500)
    })
    await medicines.updateMedicine(medicine, data.number + number);

    ctx.body = {
        success: true
    }
}

export default {
    getSales,
    getSaleById,
    addSale,
    deleteSale
}
