// Buffer 对象所支持的编码
console.log(Buffer.isEncoding('utf-8'));  // true
console.log(Buffer.isEncoding('gbk'));  // false
console.log(Buffer.isEncoding('hex'));  // true

var arr = [1, 2, 3];
var bf = new Buffer(10);
// 判断是否是 Buffer 对象
console.log(Buffer.isBuffer(arr));   // false
console.log(Buffer.isBuffer(bf));  // true

var str1 = 'miaov';

console.log(str1.length);
console.log(Buffer.byteLength(str1));  // 字节长度

var str2 = '妙味';
console.log(str2.length);  // 2
console.log(Buffer.byteLength(str2, 'utf-8'));  // 6


var list = [new Buffer(str1), new Buffer(str2)];
console.log(list);

//  concat 拼接 Buffer 数组
var bf1 = Buffer.concat(list, 11);  // 11 为拼接后的字节长度  11不加也可以,就是比较消耗性能
console.log(bf1);


process.stdout.write('请输入内容：');

process.stdin.resume();

process.stdin.on('data', function (chunk) {

    //console.log(chunk.toString());  // chunk 就是 Buffer 类型的  0a就是换行(回车)

    console.log('输入的内容是：' + chunk); // 字符串拼接,默认会调用 chunk.toString()方法

});
