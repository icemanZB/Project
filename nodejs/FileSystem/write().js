var fs = require('fs');
// 以读写的方式打开文件 "r+"
fs.open('../readme', 'r+', function (err, fd) {
    if (err) {
        console.log('文件打开失败');
    } else {
        /**  也有同步的版本 writeSync()
         *  fs.write(fd,buffer,offset,length[,position],callback)
         *  fd : 通过open()方法成功打开一个文件返回的一个编号
         *  buffer: 要写入的数据
         *  offset: 偏移量( 把buffer中要写入的数据的起始位置 )
         *  length: 要写入的buffer数据的长度
         *  position:fd中的起始位置
         *  callback: 回调
         * */
        var bf = new Buffer('123');
        fs.write(fd, bf, 0, 3, 0, function () {
            console.log(arguments);
        });

        // 第二种方法
        fs.write(fd, 'aaa', 5, 'utf-8');
        // 关闭打开的文件
        fs.close( fd ,function(){

        });
    }
});
