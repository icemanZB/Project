/*
 * buf.write(要写入的字符串, 从Buffer对象中的几位开始写入, 写入的字符串的长度, 写入的字符串的编码)
 * */

var str = 'miaov';

console.log(new Buffer(str));

var bf = new Buffer(5);  // 如果长度设定为3,那么多余的部分就会被截断


bf.write(str);  // 把字符中的内容写入到 Buffer 中
console.log(bf);

bf.write(str, 1);  // 把字符串写入了 Buffer 对象的第一位

bf.write(str, 1, 3);  // 3 为字符串的长度(写多少位长度到 Buffer 中) mia 3个字符到Buffer中的第一个位置

console.log(bf);

