const {src,dest,series,parallel,watch} = require('gulp')
const gulpWebserver = require('gulp-webserver')
const webpackStream = require('webpack-stream')
const path = require('path')

function copyhtml(){
    return src('./*.html')
        .pipe(dest('./dev'))
}

function webserver(){
    return src('./dev')
        .pipe(gulpWebserver({
                port: 8000,
                livereload: true,
                open:true,
        }))
}

function packjs(){
    return src('./src/**/*')
        .pipe(webpackStream({
            mode: 'development',
            entry: {
                app: './src/app.js',
            },
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, './dev')
            },  
        }))
        .pipe(dest('./dev/scripts'))
}


exports.default = series(parallel(packjs),copyhtml,webserver)