var gulp=require('gulp');
var connect=require('gulp-connect');
var open=require('gulp-open');
var browserify=require('browserify');
var reactify=require('reactify');
var source=require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint=require('gulp-eslint');

var config={
  port:9005,
  baseURL:'http://localhost',
  paths:{
    html:'./src/*.html',
    js:'./src/**/*.js',
    image:'./src/images/*',
    css:[
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
    'node_modules/toastr/build/toastr.min.css'
    ],
    mainjs:'./src/main.js',
    dist:'./dist'

  }
};
gulp.task('connect',function(){
  connect.server({
   root:['dist'],
   port:config.port,
   base:config.baseURL,
   livereload:true

  });
});

gulp.task('open',['connect'],function(){
   gulp.src('dist/index.html')
   .pipe(open({url: 'http://localhost:9005'}));
});
gulp.task('html',function(){
  gulp.src(config.paths.html)
  .pipe(gulp.dest(config.paths.dist))
   .pipe(connect.reload());
});
gulp.task('watch',function(){
  gulp.watch(config.paths.html,['html']);
  gulp.watch(config.paths.js,['js']);
});
gulp.task('js',function(){
  browserify(config.paths.mainjs)
   .transform(reactify)
   .bundle()
   .on('error',console.error.bind(console))
   .pipe(source('bundle.js'))
   .pipe(gulp.dest(config.paths.dist +'/script'))
   .pipe(connect.reload());
});
gulp.task('css',function(){
  gulp.src(config.paths.css)
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest(config.paths.dist +'/css'));
});

gulp.task('image',function(){
  gulp.src(config.paths.image)
  .pipe(gulp.dest(config.paths.dist +'/images'))
  .pipe(connect.reload());
});

gulp.task('default',['html','js','css','image','open','watch']);
