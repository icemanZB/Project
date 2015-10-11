var fs = require('fs');

fs.readFile('../readme', function (err, data) {
    console.log(arguments);

    if (err) {
        console.log('文件读取失败');
    } else {
        console.log(data.toString());
    }
});

// 删除文件
fs.unlink('2.txt', function (err) {
    if (err) {
        console.log('删除失败');
    } else {
        console.log('删除成功');
    }
});

// 重命名
fs.rename('2.txt', '2.new.txt', function () {
    console.log(arguments);
});

fs.stat('2.new.txt', function () {
    console.log(arguments);
});