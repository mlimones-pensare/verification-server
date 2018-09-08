const Sequelize = require('sequelize');
const { sequelize } = require('./connection');

const User = sequelize.define('user', {
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  public_key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  account_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
}, {
  underscored: true,
});

module.exports = {
  User,
}
