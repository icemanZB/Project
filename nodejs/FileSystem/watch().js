var fs = require('fs');

var filename='2.new.txt';

// 不稳定这个方法，文件状态发生改变的时候，回调就会被执行
fs.watch(filename,function(ev,fn){
    console.log(ev);
    if(fn){
        console.log('文件发生了改变');
    }else{
        console.log('出问题了');
    }
});
