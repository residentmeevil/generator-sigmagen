  var gulp 		          = require('gulp'),
      sass 		          = require('gulp-ruby-sass'),
      autoprefixer      = require('gulp-autoprefixer'),
      <% if (includeSwig) { %>swig             = require('gulp-swig'),<% } %>
      del  		          = require('del'),
      concat            = require('gulp-concat'),
      jshint            = require('gulp-jshint'),
      uglify            = require('gulp-uglify'),
      browserSync       = require('browser-sync').create();

  var config = {
      bowerDir: './www/lib' ,
      npmDir: './node_modules' 
  }

  gulp.task('default', ['clean'], function() {
      gulp.start('styles',<% if (includeSwig) { %>'swig',<% } %><% if (includeFontawesome) { %>'icons',<% } %>'jshint', 'scripts', 'fonts', 'styleguide', 'favicon', 'images', 'browser-sync');
  });

  gulp.task('clean', function(cb) {
      return del(['dist/'], cb)
  });

  gulp.task('styles', function() {
    return sass('app/assets/scss/styles.scss', {
      style: 'expanded',
      loadPath:[
        <% if (includeFontawesome) { %>config.bowerDir + '/fontawesome/scss',<% } %>
        <% if (includeBourbon || includeNeat) { %>config.bowerDir + '/bourbon/app/assets/stylesheets',<% } %>
        <% if (includeNeat) { %>config.bowerDir + '/neat/app/assets/stylesheets',<% } %>
        <% if (includeBootstrap) { %>config.npmDir + '/bootstrap-sass/assets/stylesheets',<% } %>
      ]
      })
      .pipe(autoprefixer())
      .pipe(gulp.dest('dist/assets/css'))
      .pipe(browserSync.stream());
  });

<% if (includeSwig) { %>
gulp.task('swig', function() {
  return gulp.src('app/templates/pages/**/*.html')
    .pipe(swig({
        defaults: {
          cache: false
        }
      }
    ))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});<% } %>

gulp.task('jshint', function() {
    return gulp.src([
        'app/assets/js/*.js',
    ]).pipe(jshint()
    ).pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() { 
    return gulp.src([
        config.npmDir + '/jquery/dist/jquery.min.js',
        <% if (includeBootstrap) { %>config.npmDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',<% } %>
        'app/assets/js/vendor/*.js',
        'app/assets/js/*.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('favicon', function() { 
    return gulp.src('app/favicon.ico') 
        .pipe(gulp.dest('dist')); 
});

gulp.task('images', function() {
    return gulp.src('app/assets/img/**/*')
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('app/assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('styleguide', function() { 
    return gulp.src('app/styleguide/styleguide.html') 
        .pipe(gulp.dest('dist')); 
});

<% if (includeFontawesome) { %>
  gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(browserSync.stream()); 
});<% } %>

  gulp.task('browser-sync', ['styles' <% if (includeSwig) { %>, 'swig'<% } %>], function() {
    // Static server
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    <% if (includeSwig) { %>gulp.watch('app/templates/**/*.html', ['swig']);<% } %>
    gulp.watch('app/assets/scss/**/*.scss', ['styles']);
    gulp.watch('app/assets/js/**/*.js', ['jshint', 'scripts']);
    gulp.watch('app/assets/img/**/*', ['images']);
  });
