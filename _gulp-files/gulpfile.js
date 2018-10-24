const gulp = require('gulp')
    , path = require('path')
    , del = require('del')
    , less = require('gulp-less')
    , sourcemaps = require('gulp-sourcemaps')
    , minifyCss = require('gulp-clean-css')
    , modifyCssUrls  = require('gulp-modify-css-urls')
    , svgSprite = require("gulp-svg-sprites")
    , imagemin = require('gulp-imagemin')
    , spritesmith = require('gulp.spritesmith')
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
    .pipe( 
        less( {
            paths: [`${PATH.input}Pos-Pago_Performance/**/*.css`]
        }).on('error', (erro) => {
            console.log('LESS, erro compilação: ' + erro.filename);
            console.log(erro.message);
        })
    )
    .pipe(
        modifyCssUrls({
            modify(url, filePath) {
                // console.log(url);
                
                return `../image/${url}`;
            },
            prepend: '../',
            // append: ''
        })
    )
    .pipe( 
        minifyCss() 
    )
    .pipe( gulp.dest(`${PATH.output}/css`) )
});

gulp.task('sprites-svg', () =>{
    gulp.src('sprites/**/*.svg')
    .pipe( svgSprite({mode: "symbols"}) )
    .pipe( gulp.dest( `${PATH.output}/sprites`) )
});

gulp.task('sprite-png', function() {
    const spriteData = gulp.src('sprites/**/*.png') 
        .pipe(imagemin())
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
        }));

    spriteData.img.pipe(gulp.dest(`${PATH.output}/sprites/img`)); 
    spriteData.css.pipe(gulp.dest(`${PATH.output}/sprites/css`)); 
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

gulp.task( 'build', ['delete'], () => gulp.start('minify-styles', 'sprite-png') );
// gulp.task( 'build', ['delete'], () => gulp.start('minify-styles', 'sprite-png', 'prepare-require' ) );