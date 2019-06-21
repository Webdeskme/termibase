#!/usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer      = require('inquirer');
const program = require('commander');
var fs = require('fs-extra');
const dh_homedir = require('os').homedir();
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
program.version('1.0.0');
program.option('-m, --market', 'Market link of terminal apps.');
/*var x;
var y;
for(x in files){
  program.option('--'+files[x]);
}*/
program.option('-i, --installer', 'App installer').parse(process.argv);

if (program.market){ require("./market.js");}
else if (program.installer) {require("./installer.js");}
/*x = 0;
for(x in files){
	y = files[x];
  if(program.y){
    require(apps + files[x]);
  }
}*/
else{
	inquirer.prompt([
	  {
	      type: 'list',
	      name: 'apps',
	      message: 'What app do you want to open?',
	      choices: ['market', 'installer']
	}
	  ])
	  .then(answers => {
	    if(answers.apps === 'market'){
	      require('./market.js');
	    }
	    else if(answers.apps === 'installer'){
	      require('./installer.js');
	    }
	  });
}
