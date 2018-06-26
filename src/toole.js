(function () {

// 工具方法库

/**
 * 优化 typeof 方法 ，使之可以返回更好的判断结果
 * { 参数一 ：传入的值 }
 */

function type(target) {

    var template = {
        '[object Array]' : 'array',
        '[object Object]' : 'object',
        '[object Number]' : 'number - object',
        '[object Boolean]' : 'boolean - object',
        '[object String]' : 'string - object',
    }
    var ret = typeof(target)

    if ( target === null ) {
        return "null"
    }

    if ( ret === 'object' ) {    
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return ret
    }

}
this.type = type;


/**
 * 随机生成随机数
 */


/**
 * 继承方法
 * {}
 */

 
 /**
  * 数组去重
  * 拓展原型链上的功能 ：使 数组Array 具有数组去重的功能
  */

Array.prototype.unique = function () {
  var temp = {};
  var arr = [];
  var len = this.length;
  for ( var i = 0 ; i < len ; i++ ){
      if (!temp[this[i]]) {
          temp[this[i]] = 'abc';
          arr.push(this[i])
      }
  }
  return arr;
}




}())