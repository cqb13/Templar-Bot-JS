// this logger is based on the logger made by tonyG433 | https://github.com/tonyG433/DiscordBotTemplate/blob/main/utils/logger.js

import chalk from "chalk";
import moment from "moment";

export default (type, msg) => {
    const time = chalk.blue(`${moment().format('MM/DD/YY HH:mm')}`);
     const loggedType = type.toLocaleUpperCase()
     if (!type) type = 'Null'
     switch (type) {
         case 'Load': // [LOAD]
             return console.log(`\n[` + time + `]` + `[` + chalk.green(`${loggedType}`) + `]` + ' ' + chalk.cyan`${msg}`);
 
         case 'Command Ran': // [COMMAND RAN]
         case 'Command': // [COMMAND]
         case 'Event': // [EVENT]
             return console.log(`\t[` + time + `]` + `[` + chalk.yellow(`${loggedType}`) + `]` + ' ' + chalk.blue`${msg}`);
 
         case 'Debug': // [DEBUG]
             return console.log(`\n[` + time + `]` + `[` + chalk.yellow(`${loggedType}`) + `]` + ' ' + chalk.white`${msg}`)
 
         case 'Error': // [ERROR]
             return console.log(`\n[` + time + `]` + `[` + chalk.red(`${loggedType}`) + `]` + ' ' + chalk.red`${msg}`)
 
         default: // [SOMETHING ELSE]
             return console.log(`\n[`+ time + `]` + `[` + chalk.magenta(`${loggedType}`) + `]` + ' ' + chalk.blue`${msg}`);
     }
}
