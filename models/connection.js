const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION,
  logging: false,
  operatorsAliases: Op,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
        console.log('Connection has been established successfully.');
      })
  .catch(err => {
        console.error('Unable to connect to the database:', err);
      });

module.exports = {
  sequelize,
}
