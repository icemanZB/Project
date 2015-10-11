var bf = new Buffer('miaov');
console.log(bf);

// slice()  片段截取
var bf2 = bf.slice();
console.log(bf2);   // bf == bf1

var bf3 = bf.slice(2, 4);  // 从第二位2开始截取到第四位 ( 不包含第四位 )
console.log(bf3);  // 这里面的数据将和原来的Buffer引用相同的内存地址
bf3[0] = 2; // 这里改了数据,就都改变了
console.log(bf3);
console.log(bf);

// copy
var bf4 = new Buffer(10);
bf.copy(bf4); // 把 bf 拷贝到 bf4 中

console.log(bf4);

bf4[0] = 2;
// 两者不会在受影响
console.log(bf4);
console.log(bf);

bf.copy(bf4, 1, 2, 4);  // bf4z中第1个位置开始插入  bf的第2位开始到第4位结束 ( 不包括第四位 )
console.log(bf4);
