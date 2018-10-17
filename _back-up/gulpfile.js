const gulp = require('gulp')
    , path = require('path')
    , del = require('del')
    , less = require('gulp-less')
    , sourcemaps = require('gulp-sourcemaps')
    , minifyCss = require('gulp-clean-css')
    , stripDebug = require('gulp-strip-debug')
    , uglify = require('gulp-uglify')
    , folders = require('gulp-folders')
    , run = require('gulp-run-command').default;

const PATH = {
    input: '../',
    output: 'build/'
};

gulp.task('delete', () => del(PATH.output) );

gulp.task('minify-styles', () => {
    gulp.src([
        '../Pos-Pago_Performance/**/*.less',
        '../Internet_Performance/**/*.less'
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

gulp.task('minify-scripts', folders(PATH.input, (folder) => {
    let url = path.join(PATH.input, folder, '**', '*.js');

    return gulp.src([
        url, 
        '!../webpack/**/*.js', 
        '!../_gulp-files/**/*.js', 
        '!../requireOptimizer/**/*.js'
    ])
    .pipe( stripDebug() )
    .pipe( uglify() )
    .pipe( gulp.dest( `${PATH.output}/js/${folder}`) )
}))

gulp.task('prepare-require', run('node r.js -o name=config out=build/js/main-built.js baseUrl=build/js') );

// gulp.task( 'default', () => {
//     gulp.watch( PATH.styles, ['minify-styles'] );
//     gulp.watch( PATH.scripts, ['minify-scripts'] );
// });

gulp.task( 'build', ['delete'], () => gulp.start('minify-styles', 'minify-scripts') );