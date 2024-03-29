#!/usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer      = require('inquirer');
const wget = require('wget-improved');
var fs = require('fs-extra');
const dh_homedir = require('os').homedir();
var clui = require('clui');
var Progress = clui.Progress;
var dh_term = dh_homedir + '/Documents/TermiBase/';
var apps = __dirname + "/apps/";
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
console.log("Installing ...");
console.log("");
var thisPercentBar = new Progress(20);
console.log(thisPercentBar.update(0.0) + " Opening TermiBase folder");
fs.emptyDirSync(apps);
console.log(thisPercentBar.update(0.1) + "Cleard cache");
fs.copySync(dh_term, apps);
console.log(thisPercentBar.update(0.3) + " Copied apps");
var files = fs.readdirSync(apps);
console.log(thisPercentBar.update(0.4) + " Read apps");
var con = "#!/usr/bin/env node\n";
con += "const chalk = require('chalk');\n";
con += "const clear = require('clear');\n";
con += "const figlet = require('figlet');\n";
con += "const inquirer = require('inquirer');\n";
con += "const program = require('commander');\n";
con += "var fs = require('fs-extra');\n";
con += "const dh_homedir = require('os').homedir();\n";
con += "if (!fs.existsSync(dh_homedir + '/Documents/')) {fs.mkdirSync(dh_homedir + '/Documents/');}\n";
con += "var dh_term = dh_homedir + '/Documents/TermiBase/';\n";
con += "if (!fs.existsSync(dh_term)) {fs.mkdirSync(dh_term);}\n";
con += "var apps = __dirname + '/apps/';\n";
con += "if (!fs.existsSync(apps)) {fs.mkdirSync(apps);}\n";
con += "var files = fs.readdirSync(apps);";
con += "clear();\n";
con += "console.log(chalk.green(figlet.textSync('TermiBase', { horizontalLayout: 'default' })));\n";
con += "console.log('');\n";
con += "console.log(chalk.cyan.bold('Welcome to TermiBase!'));\n";
con += "console.log(chalk.yellow('Please type " + '"TermiBase -h"' + " to see all the installed commands and apps.'));\n";
con += "console.log('');\n";
con += "program.version('0.5.4');\n";
con += "program.option('-m, --market', 'Market link of terminal apps.');\n";
con += "program.option('-a, --add', 'Add an application from the market.');\n";
con += "program.option('-n, --init', 'Start a new application.');\n";
var x;
for(x in files){
  con += "program.option('--" + files[x] + "');\n";
}
con += "program.option('-i, --installer', 'App installer.').parse(process.argv);\n";
con += "if (program.market){ require(__dirname + '/market.js');}\n";
con += "else if (program.add) {require(__dirname + '/add.js');}\n";
con += "else if (program.init) {require(__dirname + '/init.js');}\n";
con += "else if (program.installer){ require(__dirname + '/installer.js');}\n";
console.log(thisPercentBar.update(0.5) + " Started creating index");
x = 0;
for(x in files){
  con += "else if(program." + files[x] + "){require(apps + '" + files[x] + "');}\n";
}
con += "else{\n";
con += "inquirer.prompt([{\n";
con += "type: 'list',\n";
con += "name: 'apps',\n";
con += "message: 'What app do you want to open?',\n";
con += "choices: ['market', 'add', 'init', 'installer'";
x = 0;
for(x in files){
  con += ", '" + files[x] + "'";
}
con += "]\n";
con += "}])\n";
con += ".then(answers => {\n";
con += "if(answers.apps === 'market'){require(__dirname + '/market.js');}\n";
con += "else if(answers.apps === 'add'){require(__dirname + '/add.js');}\n";
con += "else if(answers.apps === 'init'){require(__dirname + '/init.js');}\n";
con += "else if(answers.apps === 'installer'){require(__dirname + '/installer.js');}\n";
x = 0;
for(x in files){
con += "else if(answers.apps === '" + files[x] + "'){require(apps + '" + files[x] + "');}\n";
}
con += "});}";
//console.log(con);
console.log(thisPercentBar.update(0.6) + " Created index content");
fs.copySync(__dirname + '/node_modules', apps + 'node_modules');
console.log(thisPercentBar.update(0.8) + " Installed node_modules");
const src = 'https://raw.githubusercontent.com/Webdeskme/termibase_market/master/market.json';
const output = __dirname + '/market.json';
const options = {};
let download = wget.download(src, output, options);
download.on('error', function(err) {
console.log(err);
});
download.on('start', function(fileSize) {
//console.log(fileSize);
});
download.on('end', function(output) {
//console.log(output);
});
download.on('progress', function(progress) {
typeof progress === 'number'
// code to show progress bar
console.log(thisPercentBar.update(9.0) + " Updated market");
});
fs.writeFile(__dirname + '/index.js', con, function (err) {
  if (err) throw err;
  console.log(thisPercentBar.update(1.0) + " Finishing");
  console.log('Installed!');
});
