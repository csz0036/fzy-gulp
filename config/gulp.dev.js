
const gulp = require('gulp');
const sass = require("gulp-sass");					             // sass编译
const autoprefixer = require("gulp-autoprefixer");		         // 自动补全css前缀
const rename = require("gulp-rename");					         // 重命名
const babel = require("gulp-babel");		                     // ES6 转换成 ES5
const browsersync = require("browser-sync").create();            // 自动刷新页面
const imagemin = require('gulp-imagemin'); 
const fileinclude = require('gulp-file-include');
const path = require('./path')
const nodeEvn = process.env.NODE_ENV == 'all' ? '**/' : process.env.NODE_ENV + '/'

/* 操作js */
gulp.task('scripts', function () {
    gulp.src(path.js.dev)
     .pipe(babel({
        presets: ['es2015'] // es5检查机制
     })) 
     .on('error', function(err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
     })
     .pipe(rename({suffix: '.min'}))
     .pipe(gulp.dest(path.js.build))
     .pipe(browsersync.stream());  //文件有更新自动执行
});

/* 编译scss 自动补全前缀 */
gulp.task('style', function () {
    return gulp.src(path.css.dev)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({overrideBrowserslist: ['last 2 versions', 'safari 5', 'opera 12.1', 'ios 6', 'android 4']}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.css.build))
        .pipe(browsersync.stream());  //文件有更新自动执行
});

//图片压缩插件
gulp.task('image', function() {
    gulp.src(path.image.dev)
        .pipe(imagemin())
        .pipe(gulp.dest(path.image.build))
        .pipe(browsersync.stream());
});


gulp.task('html', function() {
    gulp.src(path.html.dev)
         .pipe(fileinclude({
            prefix: '@@',//变量前缀 @@include
            basepath: '../src/'+nodeEvn+'public',//引用文件路径
            indent:true//保留文件的缩进
        }))
        .pipe(gulp.dest(path.html.build))
        .pipe(browsersync.stream());
});

gulp.task('serve', function() {
    gulp.start('scripts','style','image','html');
    browsersync.init({
        port: 3000,
        server: {
            baseDir: ['../dist/'+nodeEvn]
        }
    });
    gulp.watch(path.css.dev, ['style']);
    gulp.watch(path.js.dev, ['scripts']);
    gulp.watch(path.image.dev, ['image']);
    gulp.watch(path.html.dev, ['html']);
});

gulp.task('default',['serve']);
