/*
 * 在一个模块中通过var定义的变量,其作用域范围是当前模块,外部不能够直接的访问
 * 如果我们想一个模块能够访问另外一个模块中定义的变量
 *   1.把变量作为global对象的一个属性,但是这样的做法是不推荐
 *   2.使用模块对象 module
 * */

// var a = 100;

// global.a = 100;

/*
 * module : 保存提供和当前模块有关的一些信息
 *
 * 在这个module对象，有一个子对象：exports 对象
 * 我们可以通过这个对象把一个模块中的局部变量对象进行提供访问
 * */

// console.log(module);

var a = 100;

module.exports.a = a;  // exports.a = a;

/*
 * 在模块作用域,还有一个内置的模块对象 exports 他其实就是 module.exports
 * 注意使用的时候去添加属性,而不要改写引用关系
 * */

// console.log( module.exports === exports );

// module.exports = [1,2,3];   // exports 和 module.exports 的指向关系已经断开了

// exports = [1, 2, 3];  不建议这样使用,也断开了引用关系