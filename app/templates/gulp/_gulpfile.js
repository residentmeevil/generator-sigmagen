  var gulp 		 = require('gulp'),
      sass 		 = require('gulp-ruby-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      <% if (includeJade) { %>jade  = require('jade'),
      gulpJade  = require('gulp-jade'),<% } %>
      del  		  = require('del'),
      webserver = require('gulp-webserver');

  var config = {
       bowerDir: './bower_components' ,
       npmDir: './node_modules' 
  }

  gulp.task('default', ['clean'], function() {
      gulp.start('styles',<% if (includeJade) { %>'jade',<% } %> 'html', <% if (includeFontawesome) { %>'icons',<% } %> 'shared-images', 'shared-fonts', 'scripts', 'jquery', 'watch', 'webserver');
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
})<% } %>

gulp.task('shared-fonts', function() { 
    return gulp.src('app/assets/fonts/**.*') 
        .pipe(gulp.dest('dist/assets/fonts')); 
});

gulp.task('shared-images', function() { 
    return gulp.src('app/assets/images/**.*') 
        .pipe(gulp.dest('dist/assets/images')); 
});

gulp.task('jquery', function() { 
    return gulp.src(config.npmDir + '/jquery/dist/jquery.min.js') 
        .pipe(gulp.dest('dist/js')); 
});

gulp.task('scripts', function() { 
    return gulp.src('app/js/static.js') 
        .pipe(gulp.dest('dist/js')); 
});

gulp.task('html', function() { 
    return gulp.src('app/html/**.html') 
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
    gulp.watch('app/templates/**/*.jade', ['jade']);
    gulp.watch('app/assets/scss/**/*.scss', ['styles']);
  });
