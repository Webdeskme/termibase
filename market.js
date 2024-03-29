const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer      = require('inquirer');
var Table = require('cli-table');
var clui = require('clui');
var Progress = clui.Progress;
var thisPercentBar = new Progress(20);
var fs = require('fs-extra');
const dh_homedir = require('os').homedir();
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
console.log("Our market place can be found at: http://termibase.webfra.me");
console.log("");
console.log("To install just download the desired app into your Termibase folder in the Documents folder,");
console.log("or just you the add comand: 'termibase -a'");
console.log("");
console.log("Then finish the install with command 'sudo termibase_install'");
console.log("");
console.log("");
console.log(chalk.yellow("Market Applications:"));
console.log("");
var file = fs.readFileSync(__dirname + "/market.json");
file = JSON.parse(file);
var table = new Table({
    head: ['app', 'description', 'author', 'version']
  //, colWidths: [100, 200, 100, 100]
});
var x;
for(x in file){
table.push(
    [x, file[x]["d"], file[x]["a"], file[x]["v"]]
);
}
console.log(table.toString());
//console.log(x + ": " + file[x]["d"] + " -- By: " + file[x]["a"] + "->v" + file[x]["v"]);
