import purchase from '../models/purchase.js'
import medicines from '../models/medicines.js'

const getPurchaseById = async function (ctx) {
    const id = ctx.query.id
    const result = await purchase.getPurchaseById(id)
    ctx.body = result
}

const getPurchases = async function (ctx) {
    const data = ctx.query
    const arr = await purchase.getPurchases(data)
    ctx.body = {
        success: true,
        data: arr,
        totalSize: 20
    }
}

const addPurchase = async function (ctx) {
    const data = ctx.request.body.data
    await purchase.addPurchase(data).catch(err => {
        ctx.throw(500)
    })

    for (let item of data) {
        const {number} = await medicines.getMedicineById(item.medicine);
        await medicines.updateMedicine(item.medicine, number + item.number);
    }

    ctx.body = {
        success: true
    }
}

const deletePurchase = async function (ctx) {
    // 删除购买记录，存货减去相应数值
    const id = ctx.request.body.id
    console.log(id)
    const {number, medicine} = await purchase.getPurchaseById(id)
    const data = await medicines.getMedicineById(medicine);
    await purchase.deletePurchase(id).catch(err => {
        ctx.throw(500)
    })
    await medicines.updateMedicine(medicine, data.number - number);

    ctx.body = {
        success: true
    }
}

export default {
    getPurchases,
    getPurchaseById,
    addPurchase,
    deletePurchase
}
