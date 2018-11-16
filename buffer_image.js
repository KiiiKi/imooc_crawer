var fs = require('fs')

    /* 原图--> buffer */
fs.readFile('node.jpg', function(err, origin_buffer){
    //如果readfile是有指定的编码，则origin_buffer就是已经指定了编码方式后获得的字符串
    console.log(Buffer.isBuffer(origin_buffer)+'\n\n')

    /* 原图--> buffer --> 新图 */
    fs.writeFile('node_buffer.png', origin_buffer, function(err){
        if(err) console.log(err+'\n\n')
    })

    /* 原图--> buffer --> base64 */
    var base64Image = origin_buffer.toString('base64')
    console.log(base64Image+'\n\n')

    /* 原图--> buffer --> base64 -->buffer */
    var decodedImage = new Buffer(base64Image,'base64')
    console.log(Buffer.compare(origin_buffer,decodedImage)+'\n\n')

    /* 原图--> buffer --> base64 -->buffer --> 新图 */
    fs.writeFile('node_decoded.png', decodedImage, function(err){
        if(err) console.log(err+'\n\n')
    })
}) 