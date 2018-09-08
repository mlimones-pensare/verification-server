const chalk = require('chalk');

//load models
const { User } = require('../models/user.model');

async function createUsers(){
  let users = await User.bulkCreate([
    {
      phone_number: '0123456789',
      display_name: 'papu pro',
    }, {
      phone_number: '1234567890',
      display_name: 'luis',
    }, {
      phone_number: '2345678901',
      display_name: 'manuel',
    },
  ]);
  return users;
}

async function seed(){
  let users = await createUsers();
}

async function main(){
  try {
    console.log(chalk.blue('seeding starting ...'));
    await seed();
    console.log(chalk.green('seeding success!'));
    process.exit(0)
  } catch(e) {
    console.log(chalk.red("seeding  failed!"));
    console.log(e);
    process.exit(1)
  }
}

main();
