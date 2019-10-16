/* 设置路径 */
const nodeEvn = process.env.NODE_ENV == 'all' ? '**/' : process.env.NODE_ENV + '/'
console.log('path-----', nodeEvn)
const path = {
    css: {
        dev: '../src/' + nodeEvn + 'scss/*.scss',
        build: '../dist/' + nodeEvn + 'css'
    },
    js: {
        dev: '../src/' + nodeEvn + 'js/**.js',
        build: '../dist/' + nodeEvn + 'js'
    },
    html: {
        dev: '../src/' + nodeEvn + '*.html',
        build: '../dist/' + nodeEvn + ''
    },
    exampleList: {
        dev: '../src/' + nodeEvn + 'exampleList/*.html',
        build: '../dist/' + nodeEvn + 'exampleList/'
    },
    image: {
        dev: '../src/' + nodeEvn + 'images/**/*.{png,jpg,jpeg,gif}',
        build: '../dist/' + nodeEvn + 'images/'
    }
}
module.exports = path