const Sequelize = require('sequelize');
const { sequelize } = require('./connection');

const User = sequelize.define('user', {
  phone_number: {
    type: Sequelize.STRING
  },
  public_key: {
    type: Sequelize.STRING
  },
  display_name: {
    type: Sequelize.STRING
  },
}, {
  underscored: true,
});

module.exports = {
  User,
}
