#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const program = require('commander');
var fs = require('fs-extra');
const dh_homedir = require('os').homedir();
var dh_term = dh_homedir + '/Documents/termibase/';
if (!fs.existsSync(dh_term)) {fs.mkdirSync(dh_term);}
var apps = __dirname + '/apps/';
if (!fs.existsSync(apps)) {fs.mkdirSync(apps);}
var files = fs.readdirSync(apps);clear();
console.log(chalk.green(figlet.textSync('TermiBase', { horizontalLayout: 'default' })));
console.log('');
console.log(chalk.cyan.bold('Welcome to TermiBase!'));
console.log(chalk.yellow('Please type "TermiBase -h" to see all the installed commands and apps.'));
console.log('');
program.version('1.0.0');
program.option('-m, --market', 'Market link of terminal apps.');
program.option('--test');
program.option('--test2');
program.option('-i, --installer', 'App installer').parse(process.argv);
if (program.market){ require(__dirname + '/market.js');}
else if (program.installer){ require(__dirname + '/installer.js');}
else if(program.test){require(apps + 'test');}
else if(program.test2){require(apps + 'test2');}
else{
inquirer.prompt([{
type: 'list',
name: 'apps',
message: 'What app do you want to open?',
choices: ['market', 'installer', 'test', 'test2']
}])
.then(answers => {
if(answers.apps === 'market'){require(__dirname + '/market.js');}
else if(answers.apps === 'installer'){require(__dirname + '/installer.js');}
else if(answers.apps === 'test'){require(apps + 'test');}
else if(answers.apps === 'test2'){require(apps + 'test2');}
});}