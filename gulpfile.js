const gulp = require('gulp')
    , path = require('path')
    , del = require('del')
    , less = require('gulp-less')
    , sourcemaps = require('gulp-sourcemaps')
    , minifyCss = require('gulp-clean-css')
    , stripDebug = require('gulp-strip-debug')
    , uglify = require('gulp-uglify-es').default
    , flatten = require('gulp-flatten')
    , run = require('gulp-run-command').default;

const PATH = {
    input: '../',
    output: 'build/'
};

gulp.task('delete', () => del(PATH.output) );

gulp.task('minify-styles', () => {
    gulp.src([
        `${PATH.input}Pos-Pago_Performance/**/*.less`,
        `${PATH.input}Internet_Performance/**/*.less`
    ])
    .pipe(sourcemaps.init())
    .pipe( 
        less( {
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }).on('error', (erro) => {
            console.log('LESS, erro compilação: ' + erro.filename);
            console.log(erro.message);
        })
    )
    .pipe( 
        minifyCss({
            compatibility: 'ie8',
            level: 1
        }) 
    )
    .pipe( gulp.dest(`${PATH.output}/css`) )
});

gulp.task('minify-scripts', () => {
   return gulp.src([
        `${PATH.input}**/*.js`,
        `!${PATH.input}_gulp-files/**/*.js`
    ])
    .pipe( stripDebug() )
    .pipe( uglify() )
    .pipe( flatten() )
    .pipe( gulp.dest( `${PATH.output}/js`) )
})

gulp.task('prepare-require', ['minify-scripts'], run('node r.js -o name=config out=build/js/master/main-built.js baseUrl=build/js') );

gulp.task( 'build', ['delete'], () => gulp.start('minify-styles', 'prepare-require' ) );