var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var csso = require('gulp-csso');
var merge = require('merge-stream');

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/emoji/*.png').pipe(spritesmith({
    imgName: 'emoji-clock.png',
    cssName: 'emoji-clock.css',
    cssTemplate: 'src/css-template.hbs'
  }));

  var imgStream = spriteData.img;

  var cssStream = spriteData.css.
    pipe(csso());

  return merge(imgStream, cssStream).pipe(gulp.dest('dist'));
});
