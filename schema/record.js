import mongoose from 'mongoose'
import moment from 'moment'

const Schema = mongoose.Schema

const recordSchema = new Schema({
  recordDate: Date,
  price: Number,
  disease: String,
  medicine: String,
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'patients'
  }
})

recordSchema.set('toJSON', { getters: true, virtuals: true })
recordSchema.set('toObject', { getters: true, virtuals: true })

recordSchema.path('recordDate').get(function (v) {
    return moment(v).format('l')
})

module.exports = mongoose.model('records', recordSchema)
