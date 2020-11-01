const db = require('../db/config');

const SequelizeA = require('sequelize');
const Op = SequelizeA.Op;

const Sequelize = db.sequelize;

class Sale {

    static async getSales({page, keyword, start, end}) {
        const Schema = Sequelize.import('../schema/sale');
        const medicines = Sequelize.import('../schema/medicines');
        if (page) {
            return  await Schema.findAll({
                limit: 20,
                offset: 20 * (page - 1),
                include: [{
                    association: Schema.hasOne(medicines, {
                        foreignKey: 'id',
                        sourceKey: 'medicine'
                    }),
                    attributes: ['name'],
                }],
                where: {
                    date: {
                        [Op.between]: [start, end]
                    }
                }
            });
        } else {
            return await Schema.findAll();
        }
    }

    static async addSale(data) {
        data.forEach(item => {
            item.price = item.price * 1;
        });
        const Schema = Sequelize.import('../schema/sale');
        await Schema.bulkCreate(data);
    }

    static async deleteSale(id) {
        const Schema = Sequelize.import('../schema/sale');
        await Schema.destroy({
            where:{ id }
       });
    }

    static async getSaleById(id) {
        const Schema = Sequelize.import('../schema/sale');
        const list = await Schema.findAll({
            raw: true,
            where: {
                id: id
            }
        });
        return list && list[0];
    }
}
module.exports = Sale;