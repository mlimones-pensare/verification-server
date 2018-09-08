//db connection
const { sequelize } = require('../models/connection');

//models
const { User } = require('../models/user.model');

async function clearDatabase() {
  await User.destroy({truncate: {cascade:  true}});
}

module.exports = {
  DB: sequelize,
  User,
  clearDatabase,
};
