'use strict';

//需引入browser-polyfill.min.js，不然ie11是undifined，ie10及以下直接报错
var m = new Map([['micheal', 99], ['bob', 90], ['baobao', 100]]);
alert(m.get('micheal'));

//在不引入browser.min.js时候只兼容ie11
var a = 3;
alert(a);

//在不引入browser.min.js时候ie11也不兼容
var log = function log() {
    alert('no param');
};
log();

$.ajax({
    type: "post",
    url: "XXX.com",
    dataType: "json",
    success: function success(data) {
        var str = '<div>\n                  <p class="name">' + data.name + '</p>\n              </div>';
        $('#body').append(str);
    }
});
