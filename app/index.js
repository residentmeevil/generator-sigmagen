'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to this fancy, brand spanking new, ' + chalk.red('Sigma Branded') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Let\'s get started, what\'s the dank, hype name for your app?',
      default: 'new-sigma-app'
    },
    {
      type: 'input',
      name: 'appDesc',
      message: 'Does this application have a description?',
      default: 'A fresh, new Sigma app.'
    }];

    this.prompt(prompts, function (props) {
      this.nameApp = props.appName;
      this.descApp = props.appDesc;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.mkdir('app');

      this.copy('html/_index.html','app/index.html');
      this.copy('_bower.json', 'bower.json');

      var replaceText = { 
          site_name: this.nameApp, 
          site_desc: this.descApp
      };
   
      this.template('_package.json', 'package.json', replaceText);
    }
  },

  install: function () {
    this.installDependencies();
  }
});
