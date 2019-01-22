const gulp=require('gulp');
const prod=require('./config/gulpfile.prod.js');
const dev=require('./config/gulpfile.dev.js');
const config=require('./config/config.js');
const $=require('gulp-load-plugins')(); 
const spritesmith=require('gulp.spritesmith');
const del = require('del');

dev();  //启动开发环境，gulp dev
prod(); //启动生产环境,  gulp prod

//清除任务，防止缓存
gulp.task('clean',function(){
    gulp.src([config.dev,config.dist])
    .pipe($.clean());
});

//创建删除任务--开发环境使用
gulp.task('cleanMap', function() {
    del([config.dev+'**/*.map']).then(paths => (
        console.log('*.map would be deleted,and the path is => ' + paths)
    ))
});
//生成雪碧图--开发环境
gulp.task('sprite', function () {  //生成雪碧图，gulp sprite,分别生成dev和dist
  let spriteData = gulp.src(config.src+'/images/*.png')
  .pipe(spritesmith({
    imgName: 'images/sprite_2.png',
    cssName: 'css/sprite.css',
    padding: 20, // 图片之间的间距
    algorithm: 'left-right', //图片排列格式，默认是top-down，我这里稍微修改下
    algorithmOpts: {sort: false} //是否排序
  }));
  return spriteData.pipe(gulp.dest(config.dist)).pipe(gulp.dest(config.dev));
});

//合并--生产环境使用
gulp.task('concat',function(){
        $.domSrc({file:"./dist/public.html",selector:'script',attribute:'src'})
        .pipe($.babel())
        .pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe($.stripDebug({
            debugger:true,console:true,alert:false
        }))
        .pipe($.removeLogging({
        // Options (optional)
        // eg:
         namespace: ['console', 'window.console']
        }))
        .pipe(gulp.dest(config.script.dist));

        $.domSrc({file:"./dist/public.html",selector:'link',attribute:'href'})
        .pipe($.concat('app.css'))
        .pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.style.dist));

         return gulp.src('./dist/public.html')
        .pipe($.cheerio({
            run: function ($,file) {
                $('script').remove(); 
                $('link').remove(); 
                $('body').append('<script src="./js/app.js"></script>'); 
                $('head').append('<link rel="stylesheet" href="./css/app.css">');
            },
            parserOptions: {
                decodeEntities: false //不转义
            }
        }))
        .pipe(gulp.dest(config.html.dist));
});



