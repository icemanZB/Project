

dropdown 中的tabindex="-1" 是什么意思

collapse 有什么用

navbar-brand

container-fluid

breadcrumb

aria-labelledby

aria-hidden

巨幕

line or block

现在的显示器都是1920  做的时候最好是1440以上的分辨率  不要设计1024分辨率

container-fluid 流体布局

container 固定布局
容器的宽度
1170、970、750、auto

栅格系统 分 12列
阈值 1200>=、992>=、786>=、768 ( 分辨率 )
            小于768( 手机 ) 、 992 ~ 768 ( pad ) 、 992~1200 ( 中等屏幕 ) 、 大于1200 ( pc )
容器的宽度       auto       、     750           、         970          、     1170
                col-xs     、     col-sm        、        col-md        、     col-lg

最多12列     xs  手机，小于768px          最大列宽 自动
            sm  平板，大于等于 768px      最大列宽 62px
            md  大于等于，992px          最大列宽 81px
            lg  大于等于，1200px         最大列宽 97px


由于容器有默认的padding值，所以尽量不要嵌套( container-fluid、container )

固定宽度 1200px
<div class="container">
...1170px  两边有15px的边距
</div>
100%流体宽度
<div class="container-fluid">
...
</div>

如果不需要根据分辨率变化而变化的，就单独给一条样式 width:1000px !important

浮动布局和栅格布局的区别
同样缩小了分辨率，都可以实现效果，但是浮动布局如果两列浮动，中间有空隙，那么当分辨率变小的时候，虽然右侧的那一列到下面去了，但是右侧的
空隙还在。而栅格布局则不会，他会贴紧浏览器的右侧，不会留有空隙

按钮图标组合使用 ( 配合下拉的剪头 )
<a href="#" class="btn btn-primary">按钮 <span class="caret"></span></a>
<button class="btn btn-primary">按钮 <span class="caret"></span></button>

箭头向上 ( 主要是dropup这个class )
<div class="btn-group dropup">
    <button class="btn btn-primary">按钮</button>
    <button class="btn btn-primary"><span class="caret"></span></button>
</div>

自定义属性：
1、data- 来操作js交互的，就是为了触发js效果
   如 data-toggle="dropdown"  dropdown值相当于js中的方法，不能修改成其他的'aaa'之类的名称
2、role、aria-，都是html5的属性，作用是针对一些特殊人群服务( 视力不好的 )，就会使用屏幕阅读器读取页面上的内容
   如 aria-haspopup="true" 是否有弹出下拉菜单( 是 )
      aria-expanded="true" 是否现在目前是展开的状态( 是展开状态 )、false 起始下拉菜单是隐藏的
   role: 当前标签的一种状态( 表示一种职责 )，让特殊人群知道模拟的是什么 role="menu"，就是模拟的是菜单
   ( 平时写代码不一定要加上 )






