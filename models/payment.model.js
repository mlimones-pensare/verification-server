const Sequelize = require('sequelize');
const { sequelize } = require('./connection');

const Payment = sequelize.define('payment', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  amount: {
    type: Sequelize.STRING
  },
  source_account: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  destination_account: {
    type: Sequelize.STRING,
    allowNull: false,
  }
},{
  underscored: true,
});

module.exports = {
  Payment,
}

