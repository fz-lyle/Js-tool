/**
 * @author 朱昆鹏
 * @name 工具方法库
 */
/**
 * @name 工具方法目录 ：
 * ajax方法
 * 设计模式 --- 单例模式
 * 优化 typeof方法 使之返回更好的结果
 * 随机生成随机数
 * 继承方法
 * 对象拷贝的方法
 * 数组去重
 * 根据索引移出数组的某一项
 * 浏览器嗅探方法
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
 * @author 朱昆鹏
 * @name 单例模式
 * @example 使用方法 ：danLi(需要被单例的函数)，结果返回一个函数，就是被单例之后的函数
 */
function danLi(fn) {
    var instance = null;
    return function() {
        return instance || (instance = fn.apply(null,arguments))
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

/**
 * 浏览器嗅探方法
 */
function xiu() {
    var nVer = navigator.appVersion,
        nAgt = navigator.userAgent,
        browser = navigator.appName,
        version = '' + parseFloat(navigator.appVersion),
        majorVersion, nameOffset, verOffset, ix, network = 'unknown';

    if ((verOffset = nAgt.indexOf('Opera')) != -1) {  // Opera
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }

    if ((verOffset = nAgt.indexOf('OPR')) != -1) {  // Opera Next 
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) { // MSIE
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {  // Chrome
    browser = 'Chrome';
    version = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf('Safari')) != -1) {  // Safari
    browser = 'Safari';
    version = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
    }
    } else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {  // Firefox
    browser = 'Firefox';
    version = nAgt.substring(verOffset + 8);
    } else if (nAgt.indexOf('Trident/') != -1) {  // MSIE 11+
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    } else if (nAgt.indexOf('NetType/') != -1) {  // WeiXin
    browser = 'WeiXin';
    if (nAgt.indexOf('NetType/WIFI') != -1) {
        network = 'WIFI';
    }else if(nAgt.indexOf('NetType/2G') != -1) {
        network = '2G';
    }else if(nAgt.indexOf('NetType/3G+') != -1) {
        network = '3G+';
    }
    verOffset = nAgt.lastIndexOf('/')
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
    }
    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {  // Other browsers
    browser = nAgt.substring(nameOffset, verOffset);
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
    }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);
    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
    // start system detect
    var os = '';
    var clientStrings = [
    {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
    {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
    {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
    {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
    {s: 'Windows Vista', r: /Windows NT 6.0/},
    {s: 'Windows Server 2003', r: /Windows NT 5.2/},
    {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
    {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
    {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
    {s: 'Windows 98', r: /(Windows 98|Win98)/},
    {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
    {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
    {s: 'Windows CE', r: /Windows CE/},
    {s: 'Windows 3.11', r: /Win16/},
    {s: 'Android', r: /Android/},
    {s: 'Open BSD', r: /OpenBSD/},
    {s: 'Sun OS', r: /SunOS/},
    {s: 'Linux', r: /(Linux|X11)/},
    {s: 'iOS', r: /(iPhone|iPad|iPod)/},
    {s: 'Mac OS X', r: /Mac OS X/},
    {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
    {s: 'QNX', r: /QNX/},
    {s: 'UNIX', r: /UNIX/},
    {s: 'BeOS', r: /BeOS/},
    {s: 'OS/2', r: /OS\/2/},
    {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
    var cs = clientStrings[id];
    if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
    }
    }
    var osVersion = '';
    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }
    switch (os) {
    case 'Mac OS X':
        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        break;
    case 'Android':
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;
    case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
        break;
    }

    //detect data
    var params = {};
    params.os = os;//操作系统
    params.osVersion = osVersion ? osVersion : 'unknown';//操作系统版本
    params.mobile = mobile;//是否移动端访问
    params.browser = browser;//浏览器
    params.browserVersion = version;//浏览器版本
    params.browserMajorVersion = majorVersion;//浏览器major版本
    
    return params;
}


/**
 * @class getElementbyClassName 手动实现，以应对没有这个方法的环境
 */
Element.prototype.getElementsByClassName = Document.prototype.getElementsByClassName = document.getElementsByClassName || function (_classname) {
    // 1. 获取 document 下面的所有标签
    var allElement = document.getElementsByName('*');
    // 2. 需要符合classname条件的 DOM
    var lastDomArray = [];
    for ( var i = 0 ; i < allElement.length ; i++ ) {
      var lastStrClass = trimSpace(allElement[i].className);
      // 将处理好的字符串，转为数组，好用于判断
      var arrayClass = lastStrClass.splice(' ')
      for ( var j = 0 ; j < arrayClass.length ; j++ ) {
        if ( arrayClass[j] === _classname ) {
          lastDomArray.push(allElement[i])
          break;
        }
      }
    }
    
    return lastDomArray;
    
    // 格式化字符串方法 ：将字符串中 连续空格，都变为一个空格，然后去掉前后空格
    function trimSpace (strClass) {
      var reg = /\s+/g;
      return strClass.replace(reg,' ').trim();
    }

}

module.exports = {
    ajax : ajax, // 自己封装的建议 ajax 方法
    danLi : danLi, // 单例模式
    type : type, // 优化 typeof 方法 ，使之可以返回更好的判断结果
    randomNum : randomNum, // 生成随机数
    eventDelegate : eventDelegate, // 事件委托方法
    removeItemByIndex : removeItemByIndex, // 移出数组的某一项 
    inherit3 : inherit3, // 继承方法
    xiu : xiu,  // 浏览器嗅探方法
};

}())

