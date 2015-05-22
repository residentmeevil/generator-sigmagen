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
      'Hey good looking. Welcome to the Sigma Generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What\'s the dank, hype name for your app?',
      default: 'My fancy new app'
    },
    {
      type: 'input',
      name: 'appDesc',
      message: 'What\'s its description?',
      default: 'A fresh, new Sigma app.'
    },

    {
    type: 'checkbox',
    name: 'featuresGrids',
    message: 'Let\'s talk grids. What do you want bundled in?',
      choices: [
      {
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      },
      {
        name: 'Bourbon',
        value: 'includeBourbon',
        checked: false
      },
      {
        name: 'Bourbon Neat',
        value: 'includeNeat',
        checked: false
      }]
    },

    {
    type: 'checkbox',
    name: 'featuresTemplates',
    message: 'Let\'s talk templates. What do you want bundled in?',
      choices: [
      {
        name: 'Handlebars',
        value: 'includeHandlebars',
        checked: true
      },
      {
        name: 'Jade',
        value: 'includeJade',
        checked: false
      }]
    },

    {
    type: 'checkbox',
    name: 'featuresExtras',
    message: 'Let\'s talk extras. What do you want bundled in?',
    choices: [{
      name: 'Font awesome',
      value: 'includeFontawesome',
      checked: true
    }]
  }];

    this.prompt(prompts, function (props) {

      var cleanName   = props.appName;
      var replaceName = cleanName.replace(/\s+/g, '-');
      var lowerName   = replaceName.toLowerCase();

      this.nameApp    = lowerName;
      this.cleanName  = cleanName;
      this.descApp    = props.appDesc;

      //Templates, grids and extras
        var featuresGrids = props.featuresGrids;
        var featuresTemplates = props.featuresTemplates;
        var featuresExtras = props.featuresExtras;

        function hasFeatureGrid(feat) {
          return featuresGrids && featuresGrids.indexOf(feat) !== -1;
        }

        function hasFeatureTemplate(feat) {
          return featuresTemplates && featuresTemplates.indexOf(feat) !== -1;
        }

        function hasFeatureExtra(feat) {
          return featuresExtras && featuresExtras.indexOf(feat) !== -1;
        }

        this.includeBourbon = hasFeatureGrid('includeBourbon');
        this.includeNeat = hasFeatureGrid('includeNeat');
        this.includeBootstrap = hasFeatureGrid('includeBootstrap');

        this.includeJade = hasFeatureTemplate('includeJade');

        this.includeFontawesome = hasFeatureExtra('includeFontawesome');

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      //Jade
      if (this.includeJade) {
        this.copy('jade/base.jade','app/templates/base.jade');

          this.copy('jade/includes/global/head.jade','app/templates/includes/global/head.jade');
          this.copy('jade/includes/global/header.jade','app/templates/includes/global/header.jade');
          this.copy('jade/includes/global/footer.jade','app/templates/includes/global/footer.jade');

          this.copy('jade/includes/partials/homepage.jade','app/templates/includes/partials/homepage.jade');

          this.copy('jade/pages/index.jade','app/templates/pages/index.jade');
      }

      //SCSS
      this.copy('scss/_styles.scss','app/assets/scss/styles.scss');

        this.copy('scss/base/_headings.scss','app/assets/scss/base/_headings.scss');

        this.copy('scss/components/_page-head.scss','app/assets/scss/components/_page-head.scss');
        this.copy('scss/components/_page-foot.scss','app/assets/scss/components/_page-foot.scss');

        this.copy('scss/generic/_box-sizing.scss','app/assets/scss/generic/_box-sizing.scss');
        this.copy('scss/generic/_normalize.scss','app/assets/scss/generic/_normalize.scss');

        this.copy('scss/objects/_wrappers.scss','app/assets/scss/objects/_wrappers.scss');

        this.copy('scss/settings/_global.scss','app/assets/scss/settings/_global.scss');

        this.copy('scss/tools/_mixins.scss','app/assets/scss/tools/_mixins.scss');

      //JS
      this.copy('js/scripts.js','app/assets/js/scripts.js');

      //CONFIG
      this.copy('gulp/_gulpfile.js','gulpfile.js');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_README.md', 'README.md');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
