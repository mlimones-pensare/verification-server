const chalk = require('chalk');

//get connection
const { DB } = require('./models.provider');


async function main(){
  try {
    console.log(chalk.blue('starting migration'));
    await DB.sync({force: true});
    console.log(chalk.green("migration success!"));
    process.exit(0);
  } catch(e) {
    console.log(chalk.red("migration failed"));
    console.log(e);
    process.exit(1);
  }
}

main();
