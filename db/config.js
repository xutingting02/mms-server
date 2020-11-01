/*
 * @Description: 
 * @Author: xtt
 * @Date: 2020-01-15 18:38:52
 * @LastEditors  : xtt
 * @LastEditTime : 2020-02-13 11:20:10
 */
const Sequelize = require('sequelize')
const sequelize = new Sequelize("mms", "xutingting02", "Xu2ting00@", {
    host: "rm-bp10qrkjxryh353vcso.mysql.rds.aliyuncs.com",
    port: "3306",
    dialect: "mysql",
    operatorsAliases: false,
    dialectOptions: {
        // 字符集
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    },
    timezone: '+08:00' //东八时区
});
module.exports = {
    sequelize
}