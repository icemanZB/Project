var fs = require('fs');

// 异步打开文件
fs.open('../readme', 'r', function (err, fd) {
    console.log(fd);
});
// ok 先输出
console.log('ok');

// 同步打开文件
var fd = fs.openSync('../readme', 'r');

console.log(fd);