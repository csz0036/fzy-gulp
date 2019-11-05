const gulp = require('gulp');
const sass = require("gulp-sass"); // sass编译
const autoprefixer = require("gulp-autoprefixer"); // 自动补全css前缀
const minifycss = require("gulp-minify-css"); // css压缩
const rename = require("gulp-rename"); // 重命名
const babel = require("gulp-babel"); // ES6 转换成 ES5
const es2015Preset = require("babel-preset-es2015");
const uglify = require("gulp-uglify"); // js压缩
const browsersync = require("browser-sync").create(); // 自动刷新页面
const imagemin = require('gulp-imagemin');
// const pump = require('pump')
// const tiny = require('gulp-tinypng-nokey');
const replace = require('gulp-replace')
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const nodeEvn = process.env.NODE_ENV == 'all' ? '**/' : process.env.NODE_ENV + '/'
const path = require('./path')

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
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
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
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', 'safari 5', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(path.css.build))
        .pipe(browsersync.stream()); //文件有更新自动执行
    done()
});

//图片压缩插件
gulp.task('image', function (done, cb) {
    // 获取原目录下所有的html文件
    gulp.src(path.image.dev),
        imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            svgoPlugins: [{
                removeViewBox: false
            }], //不要移除svg的viewbox属性
        }),
        // 输出至目标目录
        gulp.dest(path.image.build)
    done()
});


gulp.task('html', function (done) {
    gulp.src(path.html.dev)
        .pipe(fileinclude({
            prefix: '@@', //变量前缀 @@include
            basepath: '../src/' + nodeEvn + 'public', //引用文件路径
            indent: true //保留文件的缩进
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, //压缩html
            collapseBooleanAttributes: true, //省略布尔属性的值
            removeComments: true, //清除html注释
            removeEmptyAttributes: true, //删除所有空格作为属性值
            removeScriptTypeAttributes: true, //删除type=text/javascript
            removeStyleLinkTypeAttributes: true, //删除type=text/css
            minifyJS: true, //压缩页面js
            minifyCSS: true //压缩页面css
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
        .pipe(htmlmin({
            collapseWhitespace: true, //压缩html
            collapseBooleanAttributes: true, //省略布尔属性的值
            removeComments: true, //清除html注释
            removeEmptyAttributes: true, //删除所有空格作为属性值
            removeScriptTypeAttributes: true, //删除type=text/javascript
            removeStyleLinkTypeAttributes: true, //删除type=text/css
            minifyJS: true, //压缩页面js
            minifyCSS: true //压缩页面css
        }))
        .pipe(gulp.dest(path.exampleList.build))
        .pipe(browsersync.stream());
    done()
});

// gulp.task('serve', ['clean'], function() {
//     gulp.start('scripts','style','image','html');
//     browsersync.init({
//         port: 2016,
//         server: {
//             baseDir: ['dist']
//         }
//     });
//     gulp.watch(path.css.dev, ['style']);
//     gulp.watch(path.js.dev, ['scripts']);
//     gulp.watch(path.image.dev, ['image']);
//     gulp.watch(path.html.dev, ['html']);
// });

// gulp.task('default', ['clean', 'scripts', 'style', 'image', 'html']);


//series里的任务是顺序执行的，parallel里的任务是同时执行的。
gulp.task('default', gulp.series(gulp.parallel('scripts', 'style', 'image', 'html', 'exampleHtml')));