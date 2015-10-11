var fs = require('fs');

fs.open('../readme', 'r', function (err, fd) {
    if (err) {
        console.log('文件打开失败');
    } else {
        /**
         * 读取文件  readSync() 也有相对应的同步方法
         * fs.read(fd,buffer,offset,length,position,callback)
         * fd : 通过open()方法成功打开一个文件返回的一个编号
         * buffer : buffer对象
         * offset : 偏移量 ( 读取文件内容后，填充到buffer对象的哪个位置上 )
         * length : 添加到buffer中内容的长度长度
         * position : 偏移量 ( 当前文件内容的起始位置 )
         * callback : 回调
         *      err: 错误信息
         *      len: Buffer对象的长度
         *      newBf: 新的Buffer对象
         */
        var bf = new Buffer(10);
        fs.read(fd, bf, 0, 4, null, function (err, len,newBf) {
            console.log(bf);
            console.log(len);
            console.log(newBf);
        });


    }
});