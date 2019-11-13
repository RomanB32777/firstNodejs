var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSync2 = require('browser-sync').create();
var reload = browserSync.reload({ stream: true});
var nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const plumber = require('gulp-plumber');
/* eslint-enable node/no-unpublished-require */
const cssFiles = [
  './public/css/default.css',

     //'./public/css/style.css',
    './public/css/layout.css',
       './public/css/media-queries.css',
]

const jsFiles = [
  './public/js/lib.js',
  './public/js/main.js',
  './public/js/post.js',
  './public/js/comment.js',

]


const ejsFiles = [
  './views/index.ejs',
  './views/blocks/header.ejs',
  './views/blocks/footer.ejs',


]


// const gulp = require('gulp');
// const del = require('del');
// const ts = require('gulp-typescript');
// const sourcemaps = require('gulp-sourcemaps');
// const nodemon = require('gulp-nodemon');
//
// const tsProject = ts.createProject('tsconfig.json');
// const outputDir = './dist';
// const sourceMask = './src/**/*';
// const sourceMaskTS = `${sourceMask}.ts`

function clean() {
  return del('./build')
}

function styles() {
   //Шаблон для поиска файлов CSS
   //Всей файлы по шаблону './src/css/**/*.css'
   return gulp.src(cssFiles)
   //Объединение файлов в один
   .pipe(concat('style.css'))
   //Добавить префиксы
   .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
   }))
   //Минификация CSS
   .pipe(cleanCSS({
      level: 2
   }))
   //Выходная папка для стилей
   .pipe(gulp.dest('./build/css'))
  .pipe(livereload());
};

function ejs(){
  return gulp.src(ejsFiles)
  .pipe(livereload());
}

////////////// livereload //////////////////////

 gulp.task('reloader', function() {
   console.log('start');
   livereload.listen();
  gulp.watch('./public/css/**/*.css', styles);
 });

///////////////////////////////////////////////


function scripts(){

 return gulp.src(jsFiles)
//Объединение файлов в один
.pipe(concat('script.js'))
//Минификация JS
.pipe(uglify({
   toplevel: true
}))
//Выходная папка для скриптов
.pipe(gulp.dest('./build/js'))
};

const defaultTask = gulp.parallel(styles, scripts);

function watchTask() {
  gulp.watch('./public/css/**/*.css', styles);
  gulp.watch('./public/js/**/*.js', scripts);
  gulp.watch('./views/**/*.ejs', ejs);
}

function botTestTask(done) {
  return nodemon({
    script: 'app.js',
    watch: './',
//     ignore: [
//     'views/',
//   //  'node_modules/'
// ],
    delay: '1000',
    done,
  })
}

function devTask(done) {
   livereload.listen();
  watchTask();
  gulp.series(defaultTask, botTestTask)(done);

}

gulp.task('default', devTask);

// ---------------------------------------- //

// var gulp = require('gulp');
// var browserSync = require('browser-sync');
// var browserSync2 = require('browser-sync').create();
// var reload = browserSync.reload({ stream: true});
// var nodemon = require('gulp-nodemon');
//
// const concat = require('gulp-concat');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const del = require('del');
// const plumber = require('gulp-plumber');
// /* eslint-enable node/no-unpublished-require */
// const cssFiles = [
//   './public/css/style.css',
//     './public/css/media.css',
//     './public/css/layout.css'
// ]
//
// const jsFiles = [
//   './public/js/lib.js',
//   './public/js/main.js',
// ]
// gulp.task('styles', ( ) => {
//
//    //Шаблон для поиска файлов CSS
//    //Всей файлы по шаблону './src/css/**/*.css'
//    return gulp.src(cssFiles)
//    //Объединение файлов в один
//    .pipe(concat('style.css'))
//    //Добавить префиксы
//    .pipe(autoprefixer({
//       browsers: ['last 2 versions'],
//       cascade: false
//    }))
//    //Минификация CSS
//    .pipe(cleanCSS({
//       level: 2
//    }))
//    //Выходная папка для стилей
//    .pipe(gulp.dest('./build/css'));
//   // .pipe(browserSync.stream());
// });
//
// gulp.task('watch', function(done){
//   gulp.watch('./public/css/**/*.css', gulp.series('styles'));
//   done();
//   // другие ресурсы
// });
//
//
//
// gulp.task('scripts', () =>
//  gulp.src(jsFiles)
// //Объединение файлов в один
// .pipe(concat('script.js'))
// //Минификация JS
// .pipe(uglify({
//    toplevel: true
// }))
// //Выходная папка для скриптов
// .pipe(gulp.dest('./build/js'))
// );
//
// gulp.task('watchjs', gulp.series('watch', 'scripts'));
//
// gulp.task('default', gulp.parallel('styles','scripts', (done) => {
//   gulp.watch('./public/css/**/*.css', gulp.parallel('styles'));
//   gulp.watch('./public/js/**/*.js', gulp.parallel('scripts'));
//   done();
// }));


// ------------------------------------------------------ //``

// --------------------------- //

// var gulp = require('gulp');
// var browserSync = require('browser-sync');
// var browserSync2 = require('browser-sync').create();
// var reload = browserSync.reload({ stream: true});
// var nodemon = require('gulp-nodemon');
//
// const concat = require('gulp-concat');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const del = require('del');
// const plumber = require('gulp-plumber');
//
// const cssfiles = [
//   './public/css/style.css',
//     './public/css/media.css',
//     './public/css/layout.css'
// ]
//
// gulp.task('styles', function () {
//     return gulp.src(cssfiles)
//     .pipe(plumber())
//     .pipe(concat('style.css'))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(cleanCSS({level: 2}))
//         .pipe(gulp.dest('./build/css'))
//         .pipe(browserSync2.stream());
// });
//
//
//
// gulp.task('watch', () => {
//   gulp.watch('./public/js/**/*.js', gulp.parallel('styles'));
// });
//
//   gulp.task('sync', function(done) {
//      browserSync.init({
//         server: {
//             baseDir: "./"
//         },
//         port: 3000,
//         notify: false
//     });
//     done();
//   });
//
// gulp.task('default', gulp.parallel('styles', 'watch', 'sync'));

// ------------------------------- //

// const gulp = require('gulp');
// const concat = require('gulp-concat');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const del = require('del');
// const nodemon = require('gulp-nodemon');
// const plumber = require('gulp-plumber');
// const browserSync = require('browser-sync').create();
// //const cbs = require('connect-browser-sync');
// // const express = require('express');
// //
// // let app = express();
// // app.set('view engine', 'ejs');
//
// const cssfiles = [
//   './public/css/style.css',
//     './public/css/media.css',
//     './public/css/layout.css'
// ]
//
// const jsfiles = [
//   './public/js/lib.js',
//   './public/js/main.js',
// ]
//
//
// function styles() {
//  return gulp.src(cssfiles)
//  .pipe(plumber())
// .pipe(concat('style.css'))
// .pipe(autoprefixer({
//      browsers: ['last 2 versions'],
//      cascade: false
//  }))
//  .pipe(gulp.dest('./build/css'));
// }
//
// function scripts() {
//   return gulp.src(jsfiles)
//   .pipe(plumber())
//   .pipe(concat('script.js'))
//   .pipe(uglify())
//   .pipe(gulp.dest('./build/js'))
// //  .pipe(browserSync.stream());
// }
//
//
// // .pipe(uglify({
// //   toplevel: true
// // }))
//
// //autoprefixer
// gulp.task('styles', function () {
//     return gulp.src(cssfiles)
//     .pipe(plumber())
//     .pipe(concat('style.css'))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(cleanCSS({level: 2}))
//         .pipe(gulp.dest('./build/css'));
//       //  .pipe(browserSync.stream());
// });
//
// let files = ["./*.html", './public/js/**/*.js'];
//
// //gulp.task('styles', styles);
// gulp.task('scripts', scripts);
//
// gulp.task('watch', (done) => {
//
//  gulp.watch('./public/css/**/*.css', gulp.series(styles, scripts));
//  // gulp.watch('./public/css/**/*.css', styles);
//  // gulp.watch('./public/js/**/*.js', scripts);
//  console.log("start");
//  done();
// });
//
// gulp.task('build', gulp.series(gulp.parallel(styles, scripts)));
//
// gulp.task('dev', gulp.series('build', 'watch'));
//
//
//
//
//   gulp.task('sync', function() {
//      browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
//     // app.use(cbs(bs));
//     // app.get('/news/:id', function(req, res) {
//     //   res.send('This is - ' + req.params.id);
//     // });
//     gulp.watch(['./**/*.js', './**/*.html', './**/*.css']).on("change", browserSync.reload);
//   });
//
// //gulp.task('sync2', function() {
// //
// // if (app.get('/env') === 'development') {
// //    console.log("h");
// //   var browserSync = require('browser-sync');
// //  var bs = browserSync.init({ logSnippet: false });
// //   app.use(cbs(bs));
// // }
// //
// // });
//
// gulp.task('develop', function () {
//
//
//   let stream = nodemon({ script: 'app.js'
//         //  , ext: 'j html'
//           , env: {
//             "PORT": 3000,
//             //'NODE_ENV': 'development' ,
//             "MONGO_URL": "mongodb://localhost/blog"
//           },
//          //tasks: ['watch'],
//       //     watch: files
//           })
//         //   done: one
//
//   stream
//       .on('restart', function () {
//         console.log('restarted!');
//       })
//       .on('crash', function() {
//         console.error('Application has crashed!\n')
//          stream.emit('restart', 10)  // rtart te server in 10 seconds
//       })
// })
//
// // gulp.task('suka', gulp.parallel('develop', 'watch'));
// // gulp.task('a', gulp.parallel('sync', 'suka'));
// //module.exports = gulp;
