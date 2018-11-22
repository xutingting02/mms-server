import patient from '../models/patient.js'
import record from '../models/record.js'

const getPatientById = async function (ctx) {
  const id = ctx.query.id
  const result = await patient.getPatientById(id)
  ctx.body = result
}

const getPatients = async function (ctx) {
  const data = ctx.query
  const patientArr = await patient.getPatients(data)
  const totalSize = await patient.getCount()

  ctx.body = {
    success: false,
    data: patientArr,
    totalSize
  }
}

const updatePatient = async function (ctx) {
  const data = ctx.request.body
  try {
    await patient.updatePatient(data).catch(err => {
      console.log(err)
    })
    ctx.body = {
      success: true
    }
  }
  catch (err) {
    ctx.throw(500)
  }
}

const addPatient = async function (ctx) {
  const data = ctx.request.body
  if (data.id) {
    await updatePatient(ctx)
  }
  else {
    await patient.addPatient(data).catch(err => {
      ctx.throw(500)
    })
    ctx.body = {
      success: true
    }
  }
}

const deletePatient = async function (ctx) {
  const id = ctx.request.body.id;
  await patient.deletePatient(id).catch(err => {
    ctx.throw(500)
  })
  await record.deleteRecordById(id).catch(err => {
    ctx.throw(500)
  })
  ctx.body = {
    success: true
  }
}

export default {
  getPatients,
  getPatientById,
  addPatient,
  deletePatient,
  updatePatient
}
