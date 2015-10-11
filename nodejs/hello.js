console.log('hello nodejs');

var a = 100;
// console.log( window.a );  //  在js中可以这样访问
console.log(global.a);  // undefined  这个a是在一个模块当中,并不是在全局