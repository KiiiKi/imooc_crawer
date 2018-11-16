var http = require('http');
var cheerio = require('cheerio');
//cheerio在后台像jq一样操作html
var url = 'http://www.imooc.com/learn/348';

function filterchapters(html){
    var $ = cheerio.load(html);//要用的html整个代码用cheerio.load获得
    var chapters = $('.chapter')
    /**
     * [{
     *    chapterTitle: '';
     *    videos:[
     *       title: '';  
     *       id: '';
     *    ]
     * }]
     */

     var courseData = [];
     chapters.each( function(item){
        var chapter = $(this) 
        console.log('item:'+item)//输出数字0,1,2...不是$(this)的内容
        var chapterTitle = chapter.find('h3').text();
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }

        videos.each( function(item){
            var video = $(this).find('.J-media-item')
            var title1 = video.text().split(')')[0].split('(')
            var videotitle = title1[0].trim() + ' (' + title1[1] + ')'
            var id = video.attr('href').split('/video/')[1]

            chapterData.videos.push({
                title:videotitle,
                id: id
            })
        })

        courseData.push(chapterData)
     })
     return courseData;
}

function printCourseInfo(courseData){
    courseData.forEach(item => {
        console.log(item.chapterTitle + '\n')
        item.videos.forEach(video => {
            console.log('  【' + video.id +'】 '+video.title + '\n')
        })
    })
}

http.get(url, function(res){
    var html = '';
    res.on('data',function(data){
        html += data;
    })
    res.on('end', function(){
        var courseData = filterchapters(html)
        printCourseInfo(courseData)
    })
}).on('error', function(){
    console.log('获取课程出错')
})
console.log('爬取完成')