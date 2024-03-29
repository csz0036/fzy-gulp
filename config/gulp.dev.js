const gulp = require('gulp');
const sass = require("gulp-sass"); // sass编译
const autoprefixer = require("gulp-autoprefixer"); // 自动补全css前缀
const rename = require("gulp-rename"); // 重命名
const babel = require("gulp-babel"); // ES6 转换成 ES5
const browsersync = require("browser-sync").create(); // 自动刷新页面
const fileinclude = require('gulp-file-include');
const path = require('./path')
const watch = require("gulp-watch")
const nodeEvn = process.env.NODE_ENV == 'all' ? '**/' : process.env.NODE_ENV + '/'
const pump = require('pump')
const replace = require('gulp-replace')
const plumber = require('gulp-plumber'); //语法错误被终止之后，修复完能继续执行

//删除dist目录下文件
const del = require('del');
gulp.task('clean', function (cb) {
    return new Promise(function (resolve, reject) {
        del(['../dist/**/*'], {
            force: true
        }, cb);
        resolve();
    });
})


/* 操作js */
gulp.task('scripts', function (done) {
    gulp.src(path.js.dev)
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015'] // es5检查机制
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.build))
        .pipe(browsersync.stream()); //文件有更新自动执行
    done()
});

/* 编译scss 自动补全前缀 */
gulp.task('style', function (done) {
    gulp.src(path.css.dev)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', 'safari 5', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.css.build))
        .pipe(browsersync.stream()); //文件有更新自动执行
    done()
});

//图片压缩插件

gulp.task('image', function (done, cb) {
    pump([
        // 获取原目录下所有的html文件
        gulp.src(path.image.dev),
        // 输出至目标目录
        gulp.dest(path.image.build)
    ], cb);
    done()
});


gulp.task('html', function (done) {
    gulp.src(path.html.dev)
        .pipe(fileinclude({
            prefix: '@@', //变量前缀 @@include
            basepath: '../src/' + nodeEvn + 'public', //引用文件路径
            indent: true //保留文件的缩进
        }))
        .pipe(gulp.dest(path.html.build))
        .pipe(browsersync.stream());
    done()
});
gulp.task('exampleHtml', function (done) {
    gulp.src(path.exampleList.dev)
        .pipe(fileinclude({
            prefix: '@@', //变量前缀 @@include
            basepath: '../src/' + nodeEvn + 'public', //引用文件路径
            indent: true //保留文件的缩进
        }))
        .pipe(replace(/\.\//gi, '../'))
        .pipe(gulp.dest(path.exampleList.build))
        .pipe(browsersync.stream());
    done()
});

gulp.task('serve', function (done) {
    browsersync.init({
        port: 3000,
        server: {
            baseDir: ['../dist/' + nodeEvn],
            index: 'index.html'
        }
    });
    watch(path.css.dev, gulp.series('style'));
    watch(path.js.dev, gulp.series('scripts'));
    watch(path.image.dev, gulp.series('image'));
    watch(path.html.dev, gulp.series('html'));
    watch(path.exampleList.dev, gulp.series('exampleHtml'));
    done()
})

//series里的任务是顺序执行的，parallel里的任务是同时执行的。
// gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'style', 'image', 'html'), 'serve'));
gulp.task('default', gulp.series(gulp.parallel('scripts', 'style', 'image', 'html', 'exampleHtml'), 'serve'));

// gulp.task('default', gulp.series('serve'));