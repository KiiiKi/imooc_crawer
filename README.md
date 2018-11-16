# imooc_crawer

#### buffer_image.js（图片编码方式）
> 实验“原图--> buffer --> base64 -->buffer --> 新图”过程
  
#### custom_stream.js (创建自定义的可读可写流)
> 创建自定义的可读可写流，并自定义其方法.  
> 改变上下文指针call()  
> 继承原型方法util.inherits(A,B)  
> 用原型私有方法ReadStream.prototype._read

#### crawer.js（爬单页面）
> var cheerio = require('cheerio');//cheerio在后台像jq一样操作html

#### promise_crawer.js（同时爬多网页）
```
promise.all(  
// getPageAsync通过不同url返回网页全部html
// 将各网页的全部html放到fetchCourseArray
// 对fetchCourseArray里的每个都做后面的Promise.then操作 
).then(function(pages){  
// pages是全部的html，page是某个有面html
// 分别filterchapters(html)来获得全部html中所需要的部分html
// 将各页面所需部分存入coursesData
// 对coursesData按人数排序
// 将coursesData里的按格式printCourseInfo输出console  
})  
```

