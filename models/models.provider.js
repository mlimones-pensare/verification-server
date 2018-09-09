//db connection
const { sequelize } = require('../models/connection');

//models
const { User } = require('../models/user.model');
const { Payment } = require('../models/payment.model');

async function clearDatabase() {
  await User.destroy({truncate: {cascade:  true}});
  await Payment.destroy({truncate: {cascade:  true}});
}

module.exports = {
  DB: sequelize,
  User,
  Payment,
  clearDatabase,
};
