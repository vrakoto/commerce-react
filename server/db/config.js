const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('commerce_react', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = {
    sequelize
}