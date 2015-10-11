var fs = require('fs');

var filedir = './miaov/source';

fs.watch(filedir, function (ev, file) {
    console.log(ev + ' / ' + file);

    // 只要有一个文件发生了变化，我们就需要对这个文件夹下的所有文件进行读取合并操作
    fs.readdir(filedir, function (err, dataList) {
        var arr = [];
        dataList.forEach(function (f) {
            if (f) {
                var info = f.statSync(filedir + './' + f);
                // console.log(info);

                if (info.mode == 33206) {
                    arr.push(filedir + './' + f);
                }
            }
        });
        console.log(arr);
        // 读取数组中的文件内容，并合并

        var content = '';
        arr.forEach(function (f) {
            var c = fs.readFileSync(f);
            console.log(c.toString());

            content += c.toString() + '\n';

            fs.writeFile('./miaov/js/aa.js', content);

        });

        console.log(content);
    });
});