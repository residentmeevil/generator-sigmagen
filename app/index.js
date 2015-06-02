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
        this.includeSwig = hasFeatureTemplate('includeSwig');

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
          
          this.copy('jade/pages/index.jade','app/templates/pages/index.jade');
      }

      //Swig
       if (this.includeSwig) {
          this.copy('swig/base.html','app/templates/base.html');

            this.copy('swig/pages/index.html','app/templates/pages/index.html');
      }

      //SCSS
      this.copy('scss/styles.scss','app/assets/scss/styles.scss');

        this.copy('scss/base/_all.scss','app/assets/scss/base/_all.scss');

        this.copy('scss/components/_all.scss','app/assets/scss/components/_all.scss');

        this.copy('scss/config/_all.scss','app/assets/scss/config/_all.scss');
          this.copy('scss/config/_box-sizing.scss','app/assets/scss/config/_box-sizing.scss');
          this.copy('scss/config/_normalize.scss','app/assets/scss/config/_normalize.scss');

        
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

        this.copy('scss/pages/_all.scss','app/assets/scss/pages/_all.scss');

        this.copy('scss/variables/_all.scss','app/assets/scss/variables/_all.scss');

        if (this.includeNeat) {
          this.copy('scss/variables/_break-points.scss','app/assets/scss/variables/_break-points.scss');
        }

        this.copy('scss/vendor/_all.scss','app/assets/scss/vendor/_all.scss');


      //JS
      this.copy('js/scripts.js','app/assets/js/scripts.js');

      //CONFIG
      this.copy('gulp/_gulpfile.js','gulpfile.js');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_README.md', 'README.md');
      this.template('favicon.ico', 'app/favicon.ico');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
