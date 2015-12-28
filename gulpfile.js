var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    nodemon = require('gulp-nodemon'),
    path = require('path');

var paths = {
    src: ['site/**/*.es6'],
    dest: 'site',
    sourceRoot: path.join(__dirname, 'site')
}

gulp.task('babel', function () {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'site\\bin\\www',
        ext: 'es6 jade sass',
        ignore: ['*.map'],
        tasks: ['babel']
    })
    .on('restart', function () {
        console.log('restarted!');
    })
});

gulp.task('build', ['babel']);

gulp.task('default', ['build']);
