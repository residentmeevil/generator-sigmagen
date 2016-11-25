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
        name: 'Swig',
        value: 'includeSwig',
        checked: true
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
    },
    {
        type: 'checkbox',
        name: 'featuresContainers',
        message: 'Let\'s talk containers. What do you want bundled in?',
            choices: [{
                name: 'Docker File',
                value: 'includeDockerFile',
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
        var featuresContainers = props.featuresContainers;
        function hasFeatureGrid(feat) {
          return featuresGrids && featuresGrids.indexOf(feat) !== -1;
        }

        function hasFeatureTemplate(feat) {
          return featuresTemplates && featuresTemplates.indexOf(feat) !== -1;
        }

        function hasFeatureExtra(feat) {
          return featuresExtras && featuresExtras.indexOf(feat) !== -1;
        }
        
        function hasFeatureContainer(feat) {
          return featuresContainers && featuresContainers.indexOf(feat) !== -1;
        }

        this.includeBourbon = hasFeatureGrid('includeBourbon');
        this.includeNeat = hasFeatureGrid('includeNeat');
        this.includeBootstrap = hasFeatureGrid('includeBootstrap');

        this.includeSwig = hasFeatureTemplate('includeSwig');

        this.includeFontawesome = hasFeatureExtra('includeFontawesome');
        this.includeDockerFile = hasFeatureContainer('includeDockerFile');

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      //Swig
       if (this.includeSwig) {
          this.copy('swig/base.html','app/templates/base.html');

            this.copy('swig/pages/index.html','app/templates/pages/index.html');
      }

      //SCSS
      this.copy('scss/styles.scss','app/assets/scss/styles.scss');

      this.copy('scss/base/_all.scss','app/assets/scss/base/_all.scss');
        this.copy('scss/base/_body.scss','app/assets/scss/base/_body.scss');
        this.copy('scss/base/_links.scss','app/assets/scss/base/_links.scss');
        this.copy('scss/base/_lists.scss','app/assets/scss/base/_lists.scss');

        this.copy('scss/components/_all.scss','app/assets/scss/components/_all.scss');

        this.copy('scss/config/_all.scss','app/assets/scss/config/_all.scss');
          this.copy('scss/config/_box-sizing.scss','app/assets/scss/config/_box-sizing.scss');
          this.copy('scss/config/_normalize.scss','app/assets/scss/config/_normalize.scss');
          this.copy('scss/config/_clearfix.scss','app/assets/scss/config/_clearfix.scss');


          this.copy('scss/grid/_all.scss','app/assets/scss/grid/_all.scss');

        if (this.includeBootstrap) {
            this.copy('scss/grid/_overrides.scss','app/assets/scss/grid/_overrides.scss');
        }

        if (this.includeNeat) {
            this.copy('scss/grid/_scaffolding.scss','app/assets/scss/grid/_scaffolding.scss');
        }

        this.copy('scss/layout/_all.scss','app/assets/scss/layout/_all.scss');

        this.copy('scss/mixins/_all.scss','app/assets/scss/mixins/_all.scss');
          this.copy('scss/mixins/_font-size.scss','app/assets/scss/mixins/_font-size.scss');
          this.copy('scss/mixins/_retinize.scss','app/assets/scss/mixins/_retinize.scss');
          this.copy('scss/mixins/_transition.scss','app/assets/scss/mixins/_transition.scss');

        this.copy('scss/pages/_all.scss','app/assets/scss/pages/_all.scss');

        this.copy('scss/variables/_all.scss','app/assets/scss/variables/_all.scss');

        this.copy('scss/variables/_break-points.scss','app/assets/scss/variables/_break-points.scss');
        this.copy('scss/variables/_image-path.scss','app/assets/scss/variables/_image-path.scss');

        this.copy('scss/vendor/_all.scss','app/assets/scss/vendor/_all.scss');


      //JS
        this.copy('js/scripts.js','app/assets/js/scripts.js');
        if(this.includeDockerFile)
        {
            this.copy('_Dockerfile','Dockerfile');
        } 
      //CONFIG
      this.copy('gulp/_gulpfile.js','gulpfile.js');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_README.md', 'README.md');
      this.template('_.gitignore', '.gitignore');
      this.template('favicon.ico', 'app/favicon.ico');
      this.template('styleguide/styleguide.html', 'app/styleguide/styleguide.html');
      this.template('img/placeholder.gif', 'app/assets/img/placeholder.gif');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
