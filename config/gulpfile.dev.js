const gulp=require('gulp'); //引用gulp插件
const $=require('gulp-load-plugins')();  //自动加载插件，可以省略一个一个引用插件
const config=require('./index.js'); //引用配置的路径文件
const open=require('open'); //开启服务
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

function dev(){
    gulp.task('html:dev',function(){
        return gulp.src(config.html.src).pipe($.fileInclude()).pipe(gulp.dest(config.html.dev)).pipe($.connect.reload())
    });
    gulp.task('assets:dev',function(){
        return gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dev)).pipe($.connect.reload())
    });
    gulp.task('style:dev',function(){
        return gulp.src(config.style.src).pipe($.less()).pipe($.autoprefixer({
                browseers: ['last 2 versions','Firefox>=20','last 2 Explorer versions','last 3 Safari versions'],
                cascade: true
        })).pipe(gulp.dest(config.style.dev)).pipe($.connect.reload())
    });
    gulp.task('script:dev',function(){
        return gulp.src(config.script.src).pipe($.babel()).pipe($.babel()).pipe(gulp.dest(config.script.dev)).pipe($.connect.reload())
    });
    gulp.task('img:dev',function(){
        return gulp.src(config.img.src).pipe($.imagemin()).pipe(gulp.dest(config.img.dev)).pipe($.connect.reload())
    });
    gulp.task('dev',['html:dev','style:dev','script:dev','img:dev'],function(){
            browserSync.init({
				proxy: "www.gulp.com", // 指定代理url
				notify: false, // 刷新不弹出提示
				//port:3056,
			});
            gulp.watch(config.html.src,['html:dev']).on("change", reload);;
            gulp.watch(config.style.src,['style:dev']).on("change", reload);;
            gulp.watch(config.script.src,['script:dev']).on("change", reload);;
            gulp.watch(config.img.src,['img:dev']).on("change", reload);;
    })
}
module.exports=dev;