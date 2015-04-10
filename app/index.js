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
    }];

    this.prompt(prompts, function (props) {
      this.nameApp = props.appName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.mkdirp('app');

      this.copy('html/_index.html','app/index.html');
      this.copy('_package.json', 'package.json');
      this.copy('_bower.json', 'bower.json');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
