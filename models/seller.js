const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Seller = sequelize.define('seller', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    price:  Sequelize.INTEGER,
    name: Sequelize.STRING
});

module.exports = Seller;
