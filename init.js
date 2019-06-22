const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer      = require('inquirer');
var fs = require('fs-extra');
const dh_homedir = require('os').homedir();
var dh_term = dh_homedir + '/Documents/TermiBase/';
clear();
console.log(
  chalk.green(
    figlet.textSync('TermiBase', { horizontalLayout: 'default' })
  )
);
console.log("");
console.log(chalk.cyan.bold('Welcome to TermiBase!'));
console.log(chalk.yellow('Please type "TermiBase -h" to see all the installed commands and apps.'));
console.log("");
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: "What's the title of your app? (No Spaces, just capital and lowercase letters.)"
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => {
    var con = "#Writen by: " + answers.name;
    con += "const chalk = require('chalk');\n";
    con += "const clear = require('clear');\n";
    con += "const figlet = require('figlet');\n";
    con += "const inquirer = require('inquirer');\n";
    con += "var fs = require('fs-extra');\n";
    con += "const dh_homedir = require('os').homedir();\n";
    con += "clear();\n";
    con += "console.log(chalk.green(figlet.textSync('" + answers.title + "', { horizontalLayout: 'default' })));\n";
    con += "console.log('');\n";
    con += "console.log(chalk.cyan.bold('Welcome to " + answers.title + "!'));\n";
    con += "console.log('');\n";
    con += "inquirer\n";
    con += "  .prompt([\n";
    con += "  {\n";
    con += "    type: 'input',\n";
    con += "    name: 'name',\n";
    con += "    message: 'What is your name?',\n";
    con += "    default: function() {return 'Anonymous';}\n";
    con += "  },\n";
    con += "  {\n";
    con += "    type: 'list',\n";
    con += "    name: 'something',\n";
    con += "    message: 'What choise do you want?',\n";
    con += "    choices: ['a', 'b', '// COMBAK: ']\n";
    con += "    }\n";
    con += "  ])\n";
    con += ".then(answers => {\n";
    con += "  console.log('Name: ' + answers.name + ', Something: ' + answers.something);\n";
    con += "});\n";
    fs.writeFile(dh_term + answers.title, con, function (err) {
      if (err) throw err;
        console.log('Application Created');
    });
    console.log("");
    console.log("application location: " + dh_term + answers.title);
    console.log("");
    console.log("To use the app. You must install it.");
    console.log("Install with: 'termibase_install'.");
    console.log("");
  });
