/*
 * process : 他是一个全局对象,返回当前运行的程序的进程
 * */

// console.log(process); // console.log( global.process );

/*
 *  一组包含命令行参数的数组
 *  第一个元素是'node.exe'
 *  第二个元素是.js文件的名称
 *  接下来的元素依次是命令行传入的参数  在命令行中运行node  node 1.js a=1 b=2
 * */
console.log(process.argv);

console.log(process.execPath); // 开启当前进程的绝对路径

console.log(process.version); // 返回当前node版本信息

console.log(process.versions); // 返回 node 以及 依赖包的版本信息

// console.log( process.env );  用户环境信息

// console.log(process.pid);  当前运行程序进程的pid
// console.log(process.title);  当前进程的显示名称 ( Getter/Setter )
// console.log(process.arch); // 返回当前CPU处理器架构  arm/ia32/x64
// console.log(process.platform);  返回当前操作系统平台
// console.log(process.cwd);  返回当前进程的工作目录
// console.log(process.chdir(directory));  改变当前进程的工作目录
// console.log(process.memoryUsage);  返回node进程的内存情况,单位是byte

/* 只是为了保证运行状态
 setInterval(function() {

 },5000);*/


/*
 setTimeout(function() {
 process.exit();  // 退出程序
 }, 5000);*/


function Log(data) {
    process.stdout.write(data);
}

// 输出流
process.stdout.write('hello'); // 打印出hello

Log('你好');

// 默认情况下,输入流是关闭的，,监听处理输入流数据,首先要开启输入流
process.stdin.resume(); // 正在等待用户输入

// 用于监听用户的输入数据
/*
 process.stdin.on('data', function(chunk) {
 console.log('用户输入了：' + chunk);
 });*/

var a;
var b;

process.stdout.write('请输入a的值：');

process.stdin.on('data', function (chunk) {

    if (!a) {
        a = Number(chunk);
        process.stdout.write('请输入b的值：');
    } else {
        b = Number(chunk);
        process.stdout.write('结果是：' + (a + b));
    }

});