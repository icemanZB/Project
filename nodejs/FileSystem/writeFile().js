var fs = require('fs');

var filename = '2.txt';

/**
 * 像指定文件写入数据，如果文件不存在，就会新建，如果存在就会覆盖原有的文件内容
 * writeSync(filename,data,[options]) 注意参数没有callback
 */
fs.wrieFile(filename, 'hello', function () {
    console.log(arguments);
});

/**
 * 在文件后面追加新的内容，如果文件不存在会新建文件在添加到文件后面
 */
fs.appendFile(filename, 'ice', function () {
    console.log(arguments);
});

fs.exists(filename, function (isExists) {
    console.log(isExists);

    if (!isExists) {
        fs.write(filename, 'ice', function () {
            if (err) {
                console.log('出错了');
            } else {
                console.log('创建新文件成功');
            }
        });
    } else {
        fs.appendFile(filename, 'man', function (err) {
            if (err) {
                console.log('新内容追加失败');
            } else {
                console.log('新内容追加成功');
            }
        });
    }

});

// 同步模式
if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, 'ice');
    console.log('新文件创建成功');
} else {
    fs.appendFileSync(filename, 'man');
    console.log('新内容追加成功');
}












