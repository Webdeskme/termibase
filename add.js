const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer      = require('inquirer');
var clui = require('clui');
var Progress = clui.Progress;
var thisPercentBar = new Progress(20);
var fs = require('fs-extra');
const wget = require('wget-improved');
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
inquirer.prompt([
  {
      type: 'input',
      name: 'app',
      message: 'What is the name of the app you would like to install?'
}
  ])
  .then(answers => {
    const src = 'https://raw.githubusercontent.com/Webdeskme/termibase_market/master/' + answers.app;
  const output = dh_homedir + '/Documents/TermiBase/' + answers.app;
  const options = {};
  let download = wget.download(src, output, options);
    download.on('error', function(err) {
    console.log(err);
  });
  download.on('start', function(fileSize) {
    console.log(fileSize);
  });
  download.on('end', function(output) {
    console.log(output);
  });
  download.on('progress', function(progress) {
    typeof progress === 'number'
    // code to show progress bar
    console.log(thisPercentBar.update(1.0));
  });
});
