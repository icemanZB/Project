
// self 指的就是全局Worker对象
// onmessage 监听事件
self.onmessage = function (ev) {

    // console.log(ev.data); // alert console 是不认的 一般是处理大量的数据的,不可进行DOM操作

    // 传输回去
    self.postMessage(ev.data + '妙味课堂');

};