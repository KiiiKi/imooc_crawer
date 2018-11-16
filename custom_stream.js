//*******创建自定义的可读可写流，并自定义其方法

var stream = require('stream')
var util = require('util')//工具类

//自定义可读流
function ReadStream() {
    //先改变上下文（call函数是js中改变指针的函数）
    stream.Readable.call(this)
    console.log('this:' + this)
    //this指代function ReadStream()，也就是让当前函数有readable类的方法。stream.Readable指向ReadStream
}

//让function ReadStream()继承readable类里的原型方法
util.inherits(ReadStream, stream.Readable)
//ReadStream可以使用原型方法了，read为私有方法要加下划线,下面重写read方法
//read方法原是 从内部缓冲拉取并返回数据。
ReadStream.prototype._read = function() {
    this.push('i ')
    this.push('and ')
    this.push('you ')
    this.push(null)//表结束
}
/*============================================*/
//自定义可写流
function WriteStream() {
    stream.Writable.call(this)
    this._cached = Buffer.alloc(1024)//新开一个缓存位置
}
util.inherits(WriteStream, stream.Writable)
WriteStream.prototype._write = function(chunk, encode, callback) {
    console.log(chunk.toString())
    callback()
}
/*============================================ */
//自定义转换流
function TransformStream() {
    stream.Transform.call(this)
}
util.inherits(TransformStream, stream.Transform)
/**所有的变换流的执行必须提供一个_transform()方法接收输入并提供输出。
 * transform._transform()的实现会处理写入的字节，做某种计算并输出，
 * 然后使用readable.push()方法把这个输出传递到可读流 */
TransformStream.prototype._transform = function(chunk, encode, callback){
    this.push(chunk)
    callback()
}
//flush:转换操作可能需要在流的末尾发送一些额外的数据,做加前后缀等功能
TransformStream.prototype._flush = function(callback){
    this.push('yeah!')
    callback()
}
/*============================================ */
//生成实例
var rs = new ReadStream()
var ws = new WriteStream()
var ts = new TransformStream()

rs.pipe(ts).pipe(ws)