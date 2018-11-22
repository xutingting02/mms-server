import mongoose from 'mongoose'
import moment from 'moment'

const Schema = mongoose.Schema

const patientSchema = new Schema({
  date: Date,
  name: String,
  age: String,
  sex: String,
  phone: String,
  address: String,
  records: {
    type: Schema.Types.ObjectId,
    ref: 'records'
  }
})

patientSchema.set('toJSON', { getters: true, virtuals: true })
patientSchema.set('toObject', { getters: true, virtuals: true })

patientSchema.path('date').get(function (v) {
  return moment(v).format('l')
})

module.exports = mongoose.model('patients', patientSchema)
