var fs = require('fs');

// 创建文件夹
// fs.mkdir(path,[mode],callback)
fs.mkdir('./1', function () {
    console.log(arguments);
});

// 删除文件夹
fs.rmdir('./1', function () {
    console.log(arguments);
});

// 读取文件夹
fs.readdir('../FileSystem', function (err, fileList) {
    console.log(fileList);

    fileList.forEach(function (f) {
        f.stat(f, function (err, info) {
            console.log(arguments);
            switch (info.mode) {
                case 16822:
                    console.log('[文件夹]' + f);
                    break;
                case 33206:
                    console.log('[文件]' + f);
                    break;
                default:
                    console.log('[其他类型]' + f);
                    break;
            }
        });
    });

});