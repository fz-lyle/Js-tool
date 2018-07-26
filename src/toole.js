/**
 * @author 朱昆鹏
 * @name 工具方法库
 */
/**
 * @name 工具方法目录 ：
 * ajax方法
 * 优化 typeof方法 使之返回更好的结果
 * 随机生成随机数
 * 继承方法
 * 对象拷贝的方法
 * 数组去重
 * 根据索引移出数组的某一项
 */

(function () {

/**
 * @param {ajax 封装的方法} obj 
 */
function ajax (obj) {
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }

    obj.type = obj.type.toUpperCase()
    if( obj.type == 'GET' ) {
        xhr.open(obj.type,obj.url);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(obj.data)
    }

    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                obj.success(xhr.responseText)
            }
        }
    }
}


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
 * @param {Object : 子类对象}
 * @param {Object : 父类对象}
 * 作用是 让 子类 继承到 父类上的方法 （继承属性，使用 父类构造函数.call(this,值)）
 * 思路 ：创建一个 父类原型的副本，让 父类原型的副本 赋值 给 子类的原型，修改子类原型的constuctor 指向 为子类
 * @constant {个人爱好使用 第三种方式，因为代码表达清晰}
 */
//  function inherit(zi,fu) {
//     var Fy = Object.create(fu.prototype); // 创建一个 父类原型的副本
//     zi.prototype = Fy; // 让 父类原型的副本 赋值 给 子类的原型
//     Fy.constructor = zi; // 修改子类原型的constuctor 指向 为子类
// }
// function inherit2(zi,fu) {
//     // 创建一个新的函数，将 父类的 原型 赋给这个 新函数的原型（这样做是为了防止不同多一个中间函数赋给 原型会导致 子类可以修改父类的原型）
//     var f = function () {}
//     f.prototype = fu.prototype
//     zi.prototype = f.prototype
//     zi.prototype.constuctor = zi  // 修改原型指向，这里原型指向的是 f ，我们修改成正确的 zi 构造函数
//     zi.prototype.uber = fu.prototype // 这一步没有懂
// }
// 简化的 inherit2 的写法 ， 基本和 inherit 相似了  (记住这个就可以了)
function inherit3(zi,fu) {
    var Fy = Object.create(fu.prototype)
    zi.prototype = Fy
    zi.prototype.constuctor = zi; // 因为 zi.prototype = Fy 所以 Fy.constructor = zi <===> zi.prototype.constructor = zi
}

/**
 * 对象混入继承
 * 一种是任意对象继承，这个是混入的思想，就是将任意多个的对象继承到一个对象里面
 */

 /**
  * 全新的 一种新式的继承
  * 假如 ：父类构造器是一个轮播图 ，另外一个父类构造器是一个 获取网络请求的 ，如果我们把这两者继承出一个新的 构造器，同时具有 轮播图 + 网络请求的方法
  * 一个更为强大的构造器 诞生了
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


/**
 * 对象拷贝的方法
 */


/**
 * 事件委托方法
 * { 委托给的DOM 需要委托的DOM 事件类型 事件处理函数}
 * 例如 eventDelegate('#list', 'li', 'click', function () { console.log(this); });
 */
function eventDelegate (parentSelector, targetSelector, events, foo) {
    // 触发执行的函数
    function triFunction (e) {
      // 兼容性处理
      var event = e || window.event;
  
      // 获取到目标阶段指向的元素
      var target = event.target || event.srcElement;
  
      // 获取到代理事件的函数
      var currentTarget = event.currentTarget;
  
      // 处理 matches 的兼容性
      if (!Element.prototype.matches) {
        Element.prototype.matches =
          Element.prototype.matchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.oMatchesSelector ||
          Element.prototype.webkitMatchesSelector ||
          function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
              i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
          };
      }
  
      // 遍历外层并且匹配
      while (target !== currentTarget) {
        // 判断是否匹配到我们所需要的元素上
        if (target.matches(targetSelector)) {
          var sTarget = target;
          // 执行绑定的函数，注意 this
          foo.call(sTarget, Array.prototype.slice.call(arguments))
        }
  
        target = target.parentNode;
      }
    }
  
    // 如果有多个事件的话需要全部一一绑定事件
    events.split('.').forEach(function (evt) {
      // 多个父层元素的话也需要一一绑定
      Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function ($p) {
        $p.addEventListener(evt, triFunction);
      });
    });
  }

/**
 *  根据所以移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
function removeItemByIndex (index, arr) {
    if (typeof index != 'number') { // 如果输入的不是数字，返回原来的数组
        return arr
    } else if (index + 1 > arr.length || index < 0) {  // 如果输入的超出正常范围，返回原来的数组
        return arr
    } else {
        arr.splice( index , 1 )
        return arr
    }
}

/**
 * 按需加载方法
 */


module.exports = {
    ajax : ajax, // 自己封装的建议 ajax 方法
    type : type, // 优化 typeof 方法 ，使之可以返回更好的判断结果
    randomNum : randomNum, // 生成随机数
    eventDelegate : eventDelegate, // 事件委托方法
    removeItemByIndex : removeItemByIndex, // 移出数组的某一项 
    inherit3 : inherit3 // 继承方法
};

}())

