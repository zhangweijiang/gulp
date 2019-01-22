//配置生产的文件

const gulp=require('gulp'); //引用gulp插件
const $=require('gulp-load-plugins')();  //自动加载插件，可以省略一个一个引用插件
const config=require('./config.js'); //引用配置的路径文件

function prod(){
    // 压缩全部html
    gulp.task('html',function(){
         return gulp.src(config.html.src).pipe($.fileInclude()).pipe($.cleanhtml()).pipe(gulp.dest(config.html.dist));
    });

    //复制assets下的全部文件
    gulp.task('assets',function(){
        return gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dist))
    });

    // 编译全部css 并压缩
    gulp.task('css',function(){
        return gulp.src(config.style.src).pipe($.sass()).pipe($.autoprefixer({
                browseers: ['last 2 versions','Firefox>=20','last 2 Explorer versions','last 3 Safari versions'],
                cascade: true
        })).pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.style.dist))
    });

    // 编译全部js 并压缩
    gulp.task('js',function(){
        return gulp.src(config.script.src)
        .pipe($.babel())
        .pipe($.removeLogging({
        // Options (optional)
        // eg:
         namespace: ['console', 'window.console']
        }))
        .pipe($.javascriptObfuscator({
            compact: true, //类型：Boolean 默认：true 是否完全压缩
            //domainLock: [".blog.com"],
            mangle: false, //类型：Boolean 默认：true 是否修改变量名
            rotateStringArray: true,
            //selfDefending: true, //类型: Boolean 默认：true
            stringArray: true,
            sourceMap:false
        }))
        .pipe(gulp.dest(config.script.dist))
    });
    gulp.task('image',function(){
        return gulp.src(config.img.src).pipe($.imagemin()).pipe(gulp.dest(config.img.dist))
    });

    // 其他不编译的文件直接copy
    gulp.task('copy', function () {
        gulp.src( config.src + '**/*.!(jpg|jpeg|png|gif|bmp|scss|js|html|tpl)')
        .pipe($.contribCopy())
        .pipe(gulp.dest(config.dist));
    });

    gulp.task('build',['html','css','js','assets','image','copy'])
}
module.exports=prod;