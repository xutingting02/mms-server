import Record from '../schema/record.js'

const addRecord = async function (data) {
  let record = new Record({
    recordDate: data.recordDate,
    price: data.price,
    disease: data.disease,
    medicine: data.medicine,
    patient: data.patient
  })
  let createResult = await record.save().catch(err => {
    console.log(err)
  })
}

const getRecords = async function (data) {
  let limit = 10
  let skip = (data.page - 1) * limit
  let query = {}
  if (data.patientId) {
    query.patient = data.patientId
  }
  let recordArr = await Record.find(query)
    .populate('patient')
    .limit(limit)
    .skip(skip)
    .catch(err => {
      console.log(err)
    })
  return recordArr
}

const getRecordById = async function (id) {
  const recordInfo = await Record.findOne({
    _id: id
  }).exec()
  return recordInfo
}

const deleteRecord = async function (id) {
  await Record.deleteMany({
    _id: {$in: id.split('|')}
  })
}

const deleteRecordById = async function (patientId) {
  await Record.deleteMany({
    patient: patientId
  })
}

const updateRecord = async function (data) {
  await Record.findByIdAndUpdate(data.id, { $set: data }).catch(err => {
    console.log(err)
  })
}

export default {
  getRecords,
  addRecord,
  getRecordById,
  deleteRecord,
  updateRecord,
  deleteRecordById
}
