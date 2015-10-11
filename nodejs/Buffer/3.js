var bf = new Buffer('miaov');
console.log(bf.toString());
console.log(bf.toString('utf-8', 1, 3));  // 从第一位开始到最后一位 ( 不包含结束位 )

var bf2 = new Buffer('妙味');
console.log(bf2);
console.log(bf2.toString('utf-8', 1));  // 会出现乱码


console.log(bf.toJSON()); // 变成JSON格式
