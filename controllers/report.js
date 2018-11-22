import report from '../models/report.js'

const getIncomeList = async function (ctx) {
  const result = await report.getIncomeList()
  ctx.body = {
    data: result
  }
}

export default {
  getIncomeList
}
