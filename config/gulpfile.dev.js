const gulp=require('gulp'); //引用gulp插件
const $=require('gulp-load-plugins')();  //自动加载插件，可以省略一个一个引用插件
const config=require('./config.js'); //引用配置的路径文件
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

function dev(){
    gulp.task('html:dev',function(){
        return gulp.src(config.html.src).pipe($.fileInclude()).pipe(gulp.dest(config.html.dev));
    });
    gulp.task('assets:dev',function(){
        return gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dev));
    });
    gulp.task('style:dev',function(){
        return gulp.src(config.style.src).pipe( $.sourcemaps.init() )
        .pipe($.sourcemaps.identityMap()).pipe($.sass()).pipe($.autoprefixer({
                browseers: ['last 2 versions','Firefox>=20','last 2 Explorer versions','last 3 Safari versions'],
                cascade: true
        })).pipe( $.sourcemaps.write('./')) // 将map文件编译到和dev同一目录下
        .pipe(gulp.dest(config.style.dev));
    });
    gulp.task('script:dev',function(){
        return gulp.src(config.script.src).pipe($.babel()).pipe($.babel()).pipe(gulp.dest(config.script.dev));
    });
    gulp.task('img:dev',function(){
        return gulp.src(config.img.src).pipe($.imagemin()).pipe(gulp.dest(config.img.dev));
    });
     // 其他不编译的文件直接copy
    gulp.task('copy:dev', function () {
        gulp.src( config.src + '**/*.!(jpg|jpeg|png|gif|bmp|scss|js|html|tpl)')
        .pipe($.contribCopy())
        .pipe(gulp.dest(config.dev));
    });

   

    gulp.task('dev',['html:dev','style:dev','script:dev','img:dev','copy:dev'],function(){
            browserSync.init({
				proxy: "www.gulp.com", // 指定代理url
				notify: false, // 刷新不弹出提示
				//port:3056,
			});
            // 监听其他不编译的文件 有变化直接copy
            gulp.watch(config.src+'/**/*.!(jpg|jpeg|png|gif|bmp|scss|js|html)', ['copy']).on("change", reload);
            gulp.watch(config.html.src,['html:dev']).on("change", reload);
            gulp.watch(config.style.src,['style:dev']).on("change", reload);
            gulp.watch(config.script.src,['script:dev']).on("change", reload);
            gulp.watch(config.img.src,['img:dev']).on("change", reload);
    })
}
module.exports=dev;