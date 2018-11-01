const gulp = require('gulp')
    , del = require('del')
    , path = require('path')
    , less = require('gulp-less')
    , sourcemaps = require('gulp-sourcemaps')
    , minifyCss = require('gulp-clean-css');

const PATH = {
    input: 'styles/**/*.less',
    output: 'build'
}

gulp.task('delete', () => del(PATH.output) );

gulp.task('styles', () => {
    gulp.src(PATH.input)
    .pipe( 
        less( {
            paths: ['styles/_base', 'styles/_components', 'styles/_helpers']
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
    .pipe( gulp.dest(PATH.output) )
});

gulp.task('map', () => {
    gulp.src(PATH.input)
    .pipe(sourcemaps.init())
    .pipe( 
        less( {
            paths: ['styles/_base', 'styles/_components', 'styles/_helpers']
        }).on('error', (erro) => {
            console.log('LESS, erro compilação: ' + erro.filename);
            console.log(erro.message);
        })
    )
    .pipe(sourcemaps.write('maps'))
    .pipe( gulp.dest(PATH.output) )
});

gulp.task( 'default', () => {
    gulp.watch( PATH.input, ['map'] );
});

gulp.task('build', ['delete'], () => {
    gulp.start('styles');
})


// evandro, tudo no css que tiver:

// ../oi_imagens/{arquivo}
// ../oi_css/{arquivo}
// ../oi_pos_imagens/{arquivo}

// tem que trocar para

// ../../image/oi_imagens/{arquivo}
// ../../image/oi_css/{arquivo
// ../../image/oi_pos_imagens/{arquivo}