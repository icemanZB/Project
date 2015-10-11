/*
 * 一个文件就是一个模块,每个模块都有自己的作用域
 * 我们使用 var 来申明一个变量,他并不是全局的,而是当前模块下的
 *
 * */

var a = 100;

global.a = 200;

console.log(a);  // 100

console.log(global.a); // 200

// __filename 当前文件被解析过后的绝对路径
// __filename 并不是全局的,而是当前模块下的,每个模块下都有这个属性
console.log(__filename);

/*
 * 模块加载系统  ( require('模块') )
 * 路径 :  绝对路径 和 相对路径
 * */

require('fs'); // 加载node中的核心模块,或者是 node_modules ( 安装目录下的 )

require('./2.js'); //  相对路径

require('d:/Study/GitHub/nodejs/module/2.js');

/*
 * 1.首先按照加载的模块的文件名称进行查找
 * 2.如果没有找到，则会在模块文件名称后加上.js的后缀，进行查找
 * 3.如果还没有找到，则会在文件名称后加上.json的后缀，进行查找
 * 4.如果还没有，则会在文件名称后加上.node的后缀，进行查找
 *
 * 文件名称 -> .js -> .json -> .node
 * */
// require('./2');

// require('./3');
