const db = require('../db/config');
const Sequelize = db.sequelize;

class Medicines {
    static async getMedicines({page, keyword}) {
        const Schema = Sequelize.import('../schema/medicines');
        if (page) {
            return  await Schema.findAll({
                limit: 20,
                offset: 20 * (page - 1)
            });
        } else {
            return await Schema.findAll();
        }
    }

    static async addMedicine(data) {
        const Schema = Sequelize.import('../schema/medicines');
        await Schema.bulkCreate(data);
    }

    static async deleteMedicine(id) {
        const Schema = Sequelize.import('../schema/medicines');
        await Schema.destroy({
            where:{ id }
       });
    }

    static async getMedicineById(id) {
        const Schema = Sequelize.import('../schema/medicines');
        const list = await Schema.findAll({
            raw: true,
            where: {
                id: id
            }
        });
        return list && list[0];
    }

    static async updateMedicine(id, number) {
        const Op = Sequelize.Op;
        const Schema = Sequelize.import('../schema/medicines');
        const updated = await Schema.update(
            {
                number: number
            },
            {
               where: {id: id}
            }
        );
    }
}
module.exports = Medicines;