var gulp 		 = require('gulp'),
    sass 		 = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    <% if (includeJade) { %>jade = require('jade'),
    gulpJade = require('gulp-jade'),<% } %>
    del  		 = require('del');

gulp.task('default', ['clean'], function() {
    gulp.start('styles',<% if (includeJade) { %>'jade',<% } %> 'watch');
});

gulp.task('clean', function(cb) {
    del(['web/assets/css'], cb)
});

gulp.task('styles', function() {
  return sass('app/assets/scss/styles.scss', { style: 'expanded' })
    .pipe(gulp.dest('dist/assets/css'))
});

<% if (includeJade) { %>gulp.task('jade', function () {
  return gulp.src('app/templates/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
})<% } %>

gulp.task('watch', function() {
  gulp.watch('app/assets/scss/**/*.scss', ['styles']);
});