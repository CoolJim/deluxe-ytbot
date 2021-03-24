// Imports
const chalk = require('chalk')
// Exports
module.exports = {
  errorReport(e) {
    log(chalk.bgRed.bold(`Caught error`));
    log(chalk.red(e));
  }
}
