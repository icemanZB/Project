前端面试精选  

持续更新

##[HTML5 Boilerplate](https://github.com/bigertech/interview/blob/master/html5-boilerplate.md)
##[html](https://github.com/bigertech/interview/blob/master/html.md)
##[javascript](https://github.com/bigertech/interview/blob/master/javascript.md)
##[css](https://github.com/bigertech/interview/blob/master/css.md)
##[其他](https://github.com/bigertech/interview/blob/master/other.md)



## 一般的面试过程

我们一般会有 2-3 轮面试，对于高级别的工程师可能会有 4-5 轮面试。

## 我们可能会采用哪些方法来面试
   * 代码编写笔试
   * 问答式
   
过程遵循 [STAR 面试法](http://www.baidu.com/s?ie=UTF-8&wd=star%E9%9D%A2%E8%AF%95%E6%B3%95 "什么是STAR面试法") 。

## 我们喜欢什么样的面试者

* 基础扎实
    * 从多年的经验看，那些发展好的同学都具备扎实的基础知识
    * 比如只懂 jQuery 不懂 JavaScript 是不行的哦
    * 如果了解计算机基础会更好，因为我们将面临很多非前端技术的问题
* 主动思考
    * 被动完成任务的同学在这里进步会很慢
    * 你需要有自己的想法，而不是仅仅完成任务
* 爱学习
    * 前端领域知识淘汰速度很快，所以最好能经常学习和接触新东西
* 有深度
    * 遇到问题时多研究背后深层次的原因，而不是想办法先绕过去
    * 比如追踪某个 Bug 一直了解它本质的原因
* 有视野
    * 创新往往来自于不同学科的交集，如果你了解的领域越多，就越有可能有新想法

## 我们喜欢问的问题

以下会列出一些我们常问的问题，请提前做好准备。

需要注意的是，校招和社招的是不一样的，校招会更加关注基础知识，而社招会更加关注之前做过的项目情况。

### 项目相关

面试其实说白了就是根据一个人之前的经历，来判断出后续这人会做得怎样，如果你之前从没做成过一件事情，凭什么让别人相信你之后能做成呢？因此无论哪里的面试都会问你之前做过的项目

项目可以是多人协助开发一个产品，也可以是自己个人做过的业余应用，只需介绍 1、2 个就够了，需要注意的是 1 + 1 != 2，做了两个平庸的项目不如做了一个好项目

一般来说会问如下几方面的问题：

* 做过最满意的项目是什么？
* 项目背景
    * 为什么要做这件事情？
    * 最终达到什么效果？
* 你处于什么样的角色，起到了什么方面的作用？
* 在项目中遇到什么技术问题？具体是如何解决的？
* 如果再做这个项目，你会在哪些方面进行改善？

### 技术相关 - 1 面

技术一面主要判断对基础知识的掌握

* 描述一个你遇到过的技术问题，你是如何解决的？
    * 这个问题很常见，有没有遇到过很不常见的问题？比如在网上根本搜不到解决方法的？
* 是否有设计过通用的组件？
    * 请设计一个 Dialog（弹出层） / Suggestion（自动完成） / Slider（图片轮播） 等组件
    * 你会提供什么接口？
    * 调用过程是怎样的？可能会遇到什么细节问题？
* 更细节的问题推荐参考 <https://github.com/darcyclarke/Front-end-Developer-Interview-Questions/>

### 技术相关 - 2 面

技术二面主要判断技术深度及广度

* 你最擅长的技术是什么？
    * 你觉得你在这个技术上的水平到什么程度了？你觉得最高级别应该是怎样的？
* 浏览器及性能
    * 一个页面从输入 URL 到页面加载完的过程中都发生了什么事情？越详细越好
        * （这个问既考察技术深度又考察技术广度，其实要答好是相当难的，注意越详细越好）
    * 谈一下你所知道的页面性能优化方法？
        * 这些优化方法背后的原理是什么？
        * 除了这些常规的，你还了解什么最新的方法么？
    * 如何分析页面性能？
* 其它
    * 除了前端以外还了解什么其它技术么？
    * 对计算机基础的了解情况，比如常见数据结构、编译原理等

### 兴趣相关

* 最近在学什么？接下来半年你打算学习什么？
* 做什么方面的事情最让你有成就感？需求设计？规划？具体开发？
* 后续想做什么？3 年后你希望自己是什么水平？

### 主动性相关

我们团队和很多其它团队不一样，我们没有 PM 天天跟在你后面催你做事情，所以你需要自主去发现和解决问题，主动性是我们最看重的软素质之一

* 在之前做过的项目中，有没有什么功能或改进点是由你提出来的？
* 是否有参与和改进其它开源项目

### 把我们团队当做创业团队来对待


## 参考

* [Front-end Job Interview Questions](https://github.com/darcyclarke/Front-end-Developer-Interview-Questions)


# 以 HTML5 Boilerplate 为基础的前端面试题


## 要点：
  **题目类型**：技术视野、项目细节、理论知识、案例题  
  **进行追问**：延展问题的广度和深度，得知真实实力。因为关联性知识是长期学习获得，难以依靠临时记得。
  
  
## 关于IE hack，条件注释 <html> 相比 CSS hack 的优势是？  
![image](./images/ie-hack.png)

**追问：**  
* 日常开发中，是否进行过 IE 兼容的开发，采取过什么样的方式处理？  
* 对 Modernizr.js 是否了解，讲讲它的运行机制。如不了解，谈下对于渐进增强和优雅降级之间的理解？

延伸阅读：[Conditional Stylesheets vs CSS Hacks? Answer: Neither!](http://www.paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/)

## 网站的 SEO 可以从前端那些方面进行优化？
```
<title></title>
<meta name="description" content=“”>
```

**追问：**  
* 关于 HTML 语义化 `<h1>、<h2>、<h3>` 与 `<strong>、<b>、<em>` 的意义以及何时使用 ？  
* 谈下关于 http 200 和 304 分别代表的意义，以及 AJAX 状态有哪几种，你常用的状态是？  
* 请解释 JSONP 的工作原理，以及它为什么不是真正的 AJAX？

延伸阅读：[浅谈前端与SEO](http://uxc.360.cn/archives/984.html)

## Normalize.css 和 Reset.css 的区别？ 
```
<link rel="stylesheet" href="css/normalize.css”>
```

**追问：**  
Normalize.css 的作者 necolas 提出 「A new micro clearfix hack」，请你谈谈其工作原理，以及你还有其他清除浮动的技巧吗？（以下为代码）

![image](./images/clearfix.png)

延伸阅读：[A new micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/)

## 关于 jQuery，请指出 $ 和 $.fn 的区别，或者说出 $.fn 的用途？
```
src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"
```

**追问：**  
* 能否使用原生 javascripts 写一个弹窗效果，讲讲其原理，以及需要注意的地方？  
* 除了可以使用 CDN 提升前端性能，还有什么可以提升前端性能的方式？  
* 当网站带有大量图片，如何专门针对图片进行性能优化？  


## Google Analytics 采用的是什么加载方式？谈你你了解的 javascripts 加载方式有哪几种？
![image](./images/google-analytics.png)

**追问：**  
* AMD 与 CommonJS 的区别？  
* 对 NodeJS 有实践经验吗？如果谈谈你做过相关的项目？


## Last: 
**日常如何了解前端资讯和学习前端知识？**