import Patient from '../schema/patient.js'

const addPatient = async function (data) {
  let patient = new Patient({
    date: data.date,
    name: data.name,
    age: data.age,
    sex: data.sex,
    phone: data.phone,
    address: data.address
  })
  await patient.save().catch(err => {
    console.log(err)
  })
}

const updatePatient = async function (data) {
  await Patient.findByIdAndUpdate(data.id, { $set: data }).catch(err => {
    console.log(err)
  })
}

const getPatients = async function (data) {
  let limit = 10
  let skip = (data.page - 1) * limit
  let query = {
    [data.keywordType]: {
      '$regex': data.keyword
    }
  }
  if (data.sex !== '0') {
    query.sex = data.sex
  }
  let patientArr = await Patient.find(query)
    .limit(limit)
    .skip(skip)
    .catch(err => {
      console.log(err)
    })
  return patientArr
}

const getPatientById = async function (id) {
  const patientInfo = await Patient.findOne({
    _id: id
  }).exec()
  return patientInfo
}

const deletePatient = async function (id) {
  await Patient.deleteMany({
    _id: {$in: id.split('|')}
  })
}

const getCount = async function () {
  const count = await Patient.find().count().catch(err => {
    console.log(err)
  })
  return count
}

export default {
  getPatients,
  addPatient,
  getPatientById,
  deletePatient,
  updatePatient,
  getCount
}
