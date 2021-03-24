// Imports
const chalk = require('chalk')
// Exports
module.exports = {
  errorReport(e) {
    console.log(chalk.bgRed.bold(`Caught error`));
    console.log(chalk.red(e));
  }
}
