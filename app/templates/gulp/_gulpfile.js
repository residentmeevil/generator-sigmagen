  var gulp 		          = require('gulp'),
      sass 		          = require('gulp-ruby-sass'),
      autoprefixer      = require('gulp-autoprefixer'),
      <% if (includeJade) { %>jade  = require('jade'),
      gulpJade  = require('gulp-jade'),<% } %>
      <% if (includeSwig) { %>swig              = require('gulp-swig'),<% } %>
      del  		          = require('del'),
      concat            = require('gulp-concat'),
      jshint            = require('gulp-jshint'),
      uglify            = require('gulp-uglify'),
      webserver         = require('gulp-webserver');

  var config = {
       bowerDir: './bower_components' ,
       npmDir: './node_modules' 
  }

  gulp.task('default', ['clean'], function() {
      gulp.start('styles',<% if (includeJade) { %>'jade',<% } %><% if (includeSwig) { %>'swig',<% } %><% if (includeFontawesome) { %>'icons',<% } %>'jshint', 'scripts', 'favicon', 'watch', 'webserver');
  });

  gulp.task('clean', function(cb) {
      return del(['dist/'], cb)
  });

  gulp.task('styles', function() {
    return sass('app/assets/scss/styles.scss', { 
      style: 'expanded',
      loadPath:[
        <% if (includeFontawesome) { %>config.bowerDir + '/fontawesome/scss',<% } %>
        <% if (includeBourbon) { %>config.bowerDir + '/bourbon/app/assets/stylesheets',<% } %>
        <% if (includeNeat) { %>config.bowerDir + '/neat/app/assets/stylesheets',<% } %>
        <% if (includeBootstrap) { %>config.npmDir + '/bootstrap-sass/assets/stylesheets',<% } %>
      ]
      })
      .pipe(autoprefixer())
      .pipe(gulp.dest('dist/assets/css'))
  });

<% if (includeJade) { %>
  gulp.task('jade', function (cb) {
  return gulp.src('app/templates/pages/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    cb(err);
});<% } %>

<% if (includeSwig) { %>
gulp.task('swig', function() {
  return gulp.src('app/templates/pages/**/*.html')
    .pipe(swig())
    .pipe(gulp.dest('dist/'))
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
        'app/assets/js/vendor/*.js',
        'app/assets/js/*.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js')); 
});

gulp.task('favicon', function() { 
    return gulp.src('app/favicon.ico') 
        .pipe(gulp.dest('dist')); 
});

<% if (includeFontawesome) { %>
  gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('dist/assets/fonts')); 
});<% } %>

  gulp.task('webserver', ['styles' <% if (includeJade) { %>, 'jade'<% } %>], function() {
    return gulp.src('dist')
      .pipe(webserver({
        livereload: true,

        //Change this value to "True" to be taken to a directory listing upon running gulp
        directoryListing: {
            enable: false,
            path: 'dist'
        },
        open: true
      }));
  });

  gulp.task('watch', function() {
    <% if (includeJade) { %>gulp.watch('app/templates/**/*.jade', ['jade']);<% } %>
    gulp.watch('app/assets/scss/**/*.scss', ['styles']);
    gulp.watch('app/assets/js/**/*.js', ['jshint', 'scripts']);
  });
