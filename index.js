#!/usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer      = require('inquirer');
const program = require('commander');
var fs = require('fs-extra');
const dh_homedir = require('os').homedir();
if (!fs.existsSync(dh_homedir + '/Documents/')) {
        fs.mkdirSync(dh_homedir + '/Documents/');
}
var dh_term = dh_homedir + '/Documents/TermiBase/';
if (!fs.existsSync(dh_term)) {
        fs.mkdirSync(dh_term);
}
var apps = __dirname + "/apps/";
if (!fs.existsSync(apps)) {
	fs.mkdirSync(apps);
}
var files = fs.readdirSync(apps);
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
program.version('0.5.2');
program.option('-m, --market', 'Market link of terminal apps.');
program.option('-a, --add', 'Add an application from the market.');
program.option('-n, --init', 'Start a new application.');
program.option('-i, --installer', 'App installer').parse(process.argv);

if (program.market){ require(__dirname + "/market.js");}
else if (program.add) {require(__dirname + "/add.js");}
else if (program.init) {require(__dirname + "/init.js");}
else if (program.installer) {require(__dirname + "/instalsler.js");}
else{
	inquirer.prompt([
	  {
	      type: 'list',
	      name: 'apps',
	      message: 'What app do you want to open?',
	      choices: ['market', 'add', 'init', 'installer']
	}
	  ])
	  .then(answers => {
	    if(answers.apps === 'market'){
	      require(__dirname + '/market.js');
	    }
      else if(answers.apps === 'add'){
	      require(__dirname + '/add.js');
	    }
      else if(answers.apps === 'init'){
	      require(__dirname + '/init.js');
	    }
	    else if(answers.apps === 'installer'){
	      require(__dirname + '/installer.js');
	    }
	  });
}
