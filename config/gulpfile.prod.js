//配置生产的文件

const gulp=require('gulp'); //引用gulp插件
const $=require('gulp-load-plugins')();  //自动加载插件，可以省略一个一个引用插件
const config=require('./index.js'); //引用配置的路径文件

function prod(){
    gulp.task('html',function(){
        return gulp.src(config.html.src).pipe($.fileInclude()).pipe(gulp.dest(config.html.dist))
    });
    gulp.task('assets',function(){
        return gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dist))
    });
    gulp.task('style',function(){
        return gulp.src(config.style.src).pipe($.less()).pipe($.autoprefixer({
                browseers: ['last 2 versions','Firefox>=20','last 2 Explorer versions','last 3 Safari versions'],
                cascade: true
        })).pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.style.dist))
    });
    gulp.task('script',function(){
        return gulp.src(config.script.src)
        .pipe($.babel())
        .pipe($.uglify())
        .pipe($.stripDebug({
            debugger:true,console:true,alert:false
        }))
        .pipe(gulp.dest(config.script.dist))
    });
    gulp.task('img',function(){
        return gulp.src(config.img.src).pipe($.imagemin()).pipe(gulp.dest(config.img.dist))
    });
    gulp.task('build',['html','style','script','assets','img'])
}
module.exports=prod;