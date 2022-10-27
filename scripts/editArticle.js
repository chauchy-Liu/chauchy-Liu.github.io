// 新建文档之后用 typora 打开文件
var spawn = require('child_process').spawn;
hexo.on('new', function(data){
    spawn('/Applications/Typora.app/Contents/MacOS/Typora', [data.path]);
});
