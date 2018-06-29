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
        '[object Date]' : 'date',        
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


/**
 * 随机生成随机数
 * { randomNum(随机数生成的范围整数) }
 */
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 






/**
 * 继承方法
 * {}
 */

 // 分为两种
 // 1. 一种是继承构造函数，然后所有通过new 出来的对象，就带有 多代构造函数的属性和方法
 // 2. 一种是任意对象继承，这个是混入的思想，就是将任意多个的对象继承到一个对象里面



 
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


/**
 * 对象拷贝的方法
 */


 // 利用挂载函数，把所有的方法都挂载到全局上面  以后肯定要做一个 挂载到全局上面的方法的，只是现在还是不太清楚
function guazai () {
    window.type = type;
    window.randomNum = randomNum;
}

// 初始化函数
function init() {
    guazai()
}

init()

}())