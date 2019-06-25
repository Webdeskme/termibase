const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer      = require('inquirer');
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
console.log("To install just download the desired app into your Termibase folder in the Documents folder.");
console.log("The finish the install with command 'termibase_install'");
console.log("");
console.log("");
var file = fs.readFileSync(__dirname + "/market.json");
file = JSON.parse(file);
var x;
for(x in file){
  console.log(x + ": " + file[x]["d"] + " -- By: " + file[x]["a"] + "->v" + file[x]["v"]);
}
