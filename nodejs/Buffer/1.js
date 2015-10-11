/*
 * Buffer类
 *   用于操作二进制数据流
 * */

// new Buffer(size); size [Number] 创建一个Buffer对象，并为这个对象分配一个大小
// 当我们为一个Buffer对象分配空间大小以后，其长度是固定，不能更改

var bf = new Buffer(5);
console.log(bf);
bf[6] = 1; // 这句无效
bf[1] = 2;
console.log(bf);  // 16进制显示

// new Buffer(array);  array 字节数组
var bf1 = new Buffer([1, 2, 3]);
console.log(bf1);
bf1[10] = 10; // 这句也无效 长度是固定死的
console.log(bf1);

// new Buffer(string, [encoding]);
var bf2 = new Buffer('miaov', 'utf-8');
console.log(bf2);

// bf2.length 代表的是字节的长度,不是字符串的长度
for (var i = 0; i < bf2.length; i++) {
    console.log(bf2[i].toString(16));  // 转为16进制 bf2[i]  是2进制的
    console.log(String.fromCharCode(bf2[i]));  // 转为我们想要的字符
}

var str1 = 'miaov';
var bf3 = new Buffer(str1);  // 默认是 utf-8
console.log(str1.length);  // 5
console.log(bf3.length);  //  5

var str2 = '妙味';
var bf4 = new Buffer(str2);
console.log(str2.length);  // 2
console.log(bf4.length);  //  6  一个中文3个字节



