import Record from '../schema/record.js'

const getIncomeList = async function (data) {
  let incomeList = await Record.aggregate([
    {
      $group: {
        // _id: null,
        _id: '$recordDate',
        income: {
          $sum: '$price'
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]).limit(7)
  return incomeList
}

// const getTodayIncome = async function () {
//   let todayIncome = await Record.aggregate([
//     {
//       $match: {recordDate: new Date().toDateString()}
//     }
//   ])
// }

export default {
  getIncomeList
}
