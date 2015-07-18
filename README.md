在线小词典
===
基于请求加载数据
--
  * html数据
  
a.html  
  * json数据
b.html
  * js数据
  * xml数据
  
向服务器传递数据
--
  * 执行get请求
  * 执行post请求
  * 序列化表单
  
关注请求
--
  为了多了解一些调用Ajax方法过程中的HTTP请求，jQuery提供了一组函数，通过他们能够为各种与Ajax相关的事件注册回调函数。
例如：.ajaxStart()与.ajaxStop()。当Ajax请求开始且尚未进行其他传输时，会出发.ajaxStart()的回到函数。但当最后一次活动请求终止时，则会执行通过.ajaxStop()注册的回调函数。这些函数是全局性的，无论创建他们的代码位于何处，当Ajax通信发生时都需要调用他们。而且这些方法与.ready()方法一样，只能由$(document)调用。

Ajax与事件
--
在Ajax生成页面内容时存在一个常见的问题，即页面更新内容时，事件处理程序会丢失绑定。
解决办法就是事件委托，事件委托的本质就是把事件处理程序绑定到一个祖先元素，而这个祖先元素始终不变。

低级Ajax方法
--
前面已经用到一些用于启动Ajax通信的方法。但在内部，jQuery会把这些方法都对象为$.ajax()全局函数的一种变体。这个函数不针对任何特定的Ajax通信类型，而是接收一个选项对象参数，并根据该参数来决定相应的行为。

