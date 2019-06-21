#!/usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer      = require('inquirer');
const program = require('commander');
var fs = require('fs-extra');
const dh_homedir = require('os').homedir();
var apps = __dirname + "/apps/";
if (!fs.existsSync(apps)) {
	fs.mkdirSync(apps);
}
var files = fs.readdirSync(apps);
program.version('1.0.0');
program.option('-m, --market', 'Market link of terminal apps.');
var x;
var y;
for(x in files){
  program.option('--'+files[x]);
}
program.option('-i, --installer', 'App installer').parse(process.argv);

if (program.market){ require("./market.js");}
if (program.installer) {
  require("./installer.js");
}
x = 0;
for(x in files){
	y = files[x];
  if(program.y){
    require(apps + files[x]);
  }
}
