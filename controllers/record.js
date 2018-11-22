import record from '../models/record.js'

const getRecordById = async function (ctx) {
  const id = ctx.query.id
  const result = await record.getRecordById(id)
  ctx.body = result
}

const getRecords = async function (ctx) {
  const data = ctx.query
  const recordArr = await record.getRecords(data)
  ctx.body = {
    success: true,
    data: recordArr,
    totalSize: 20
  }
}

const addRecord = async function (ctx) {
  const data = ctx.request.body
  if (data.id) {
    await updateRecord(ctx)
  }
  else {
    await record.addRecord(data).catch(err => {
      ctx.throw(500)
    })
    ctx.body = {
      success: true
    }
  }
}

const deleteRecord = async function (ctx) {
  const id = ctx.request.body.id
  console.log(id)
  await record.deleteRecord(id).catch(err => {
    ctx.throw(500)
  })
  ctx.body = {
      success: true
  }
}

const updateRecord = async function (ctx) {
  const data = ctx.request.body
  await record.updateRecord(data).catch(err => {
    ctx.throw(500)
  })
  ctx.body = {
    success: true
  }
}

export default {
  getRecords,
  getRecordById,
  addRecord,
  deleteRecord,
  updateRecord
}
