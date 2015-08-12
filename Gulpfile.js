var gulp        = require('gulp');

var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var data        = require('gulp-data');
var jade        = require('gulp-jade');
var compass     = require('gulp-compass');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var gutil       = require('gulp-util');
var changed     = require('gulp-changed');
var sourcemaps  = require('gulp-sourcemaps');
var plumber     = require('gulp-plumber');
var del         = require('del');
var _           = require('lodash');
var browserSync = require('browser-sync');
var path        = require('path');
var reload      = browserSync.reload;

var srcFiles = {
  index: 'src/index.jade',
  // views: './src/views/**/*.jade',
  views: 'src/**/*.jade',
  js: 'src/scripts/**/*.js',
  style: 'src/sass/**/*.scss',
  assets: {
    files: 'src/assets/**',
    base: 'src/assets'
  }
};

var buildDir = {
  index: './build',
  // views: './build/views',
  js: './build/scripts',
  style: './build/stylesheets'
};

var publicDir = './_public';

// Compile Error handler
var onError = function(err) {
  gutil.log(gutil.colors.yellow(err.message));
  browserSync.notify(err.message, 5000);
};

// Clear the build directory
gulp.task('clear', function() {
  del.sync('./build');
});

// Copy assets' files to build directroy
gulp.task('lib', function() {
  return gulp.src(srcFiles.assets.files, {base: srcFiles.assets.base})
    .pipe(gulp.dest(buildDir.index));
});

// Views files
gulp.task('jade-views', function() {
  return gulp.src([srcFiles.views, '!src/**/_*.jade'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(changed(buildDir.index, {extension: '.html'}))
    .pipe(data(function (file) {
      var json = require('./src/json/' + path.basename(file.path, '.jade') + '.json');
      var data = _.assign({}, json);
      return data;
    }))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(buildDir.index));
});

// Index file
gulp.task('jade-index',['jade-views'], function() {
  return gulp.src(srcFiles.index)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(changed(buildDir.index, {extension: '.html'}))
    // .pipe(data(function (file) {
    //   var json = require('./src/json/data.json');
    //   var data = _.assign({}, json);
    //   return data;
    // }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(buildDir.index));
});

// Compass Compile
gulp.task('compass', function() {
  var stream = gulp.src(srcFiles.style)
    .pipe(compass({
      css: 'build/stylesheets',
      sass: 'src/sass',
      require: ['susy', 'breakpoint'],
    })).on('error', function(err) {
      gutil.log(gutil.colors.yellow(err.message));
      browserSync.notify(err.message, 5000);
      stream.end();
    })
    .pipe(gulp.dest(buildDir.style))
    .pipe(reload({stream: true}));
  return stream;
});

gulp.task('lint', function() {
  return gulp.src(srcFiles.js)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(changed(buildDir.js, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    // .pipe(concat('app.js'))
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(uglify({ compress: true }))
    .pipe(sourcemaps.write({
      addComment: true,
      sourceRoot: '/src/scripts'
    }))
    .pipe(gulp.dest(buildDir.js));
});

// Run Server
gulp.task('browser-sync',['build'], function() {
  browserSync({
    server: {
      baseDir: './build'
    },
    port: 8080,
    open: false
  });
});

// Watched files
gulp.task('watch', function() {
  gulp.watch(srcFiles.js, ['lint']);
  gulp.watch(srcFiles.style, ['compass']);
  gulp.watch('src/json/**/*.json', ['jade-index']);
  gulp.watch(srcFiles.views, ['jade-index']);
  gulp.watch(srcFiles.index, ['jade-index']);
});

// Livereload
var watchFolder = ['./build/**/*.html', './build/**/*.js'];
gulp.task('livereload',['watch', 'browser-sync'], function() {
  gulp.watch(watchFolder, function(file) {
    if (file.type === 'changed')
      return reload(file.path);
  });
});

// Copy file in build directory
gulp.task('copy',['build'], function() {
  return gulp.src('./build/**', {base: './build'})
    .pipe(gulp.dest(publicDir));
});

gulp.task('compile',['clear', 'lib', 'jade-index', 'lint', 'compass']);
gulp.task('build',['compile']);
gulp.task('default',['build', 'livereload']);
gulp.task('publish',['build', 'copy']);
