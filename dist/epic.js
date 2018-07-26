!(function(n) {
	var e = {};
	function t(r) {
		if (e[r]) return e[r].exports;
		var o = (e[r] = { i: r, l: !1, exports: {} });
		return n[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
	}
	(t.m = n),
		(t.c = e),
		(t.d = function(n, e, r) {
			t.o(n, e) || Object.defineProperty(n, e, { configurable: !1, enumerable: !0, get: r });
		}),
		(t.r = function(n) {
			Object.defineProperty(n, '__esModule', { value: !0 });
		}),
		(t.n = function(n) {
			var e =
				n && n.__esModule
					? function() {
							return n.default;
						}
					: function() {
							return n;
						};
			return t.d(e, 'a', e), e;
		}),
		(t.o = function(n, e) {
			return Object.prototype.hasOwnProperty.call(n, e);
		}),
		(t.p = ''),
		t((t.s = './src/epic.js'));
})({
	/*!*********************!*\
  !*** ./src/epic.js ***!
  \*********************/
	/*! no static exports found */ './src/epic.js': function(module, exports, __webpack_require__) {
		eval(
			'__webpack_require__(/*! ./performance */ "./src/performance.js")\n__webpack_require__(/*! ./toole */ "./src/toole.js")\n__webpack_require__(/*! ./zq */ "./src/zq.js")\n\n//# sourceURL=webpack:///./src/epic.js?'
		);
	},
	/*!****************************!*\
  !*** ./src/performance.js ***!
  \****************************/
	/*! no static exports found */ './src/performance.js': function(module, exports) {
		eval(
			"var performance = (function () {\n\n    // 性能模块代码\n\n/**\n * 异步加载 script 方法\n * { 参数一 ：需要加载的 script 地址 ，地址相对引入的epic.js而言 必填 , 参数二 ：传入一个匿名函数 里面可以才可以调用返回的内容 }\n */ \n\n// 使用方法演示 \n/* \n<script src=\"./performance.js\"></script>\n<script>\n    onScript('http://apps.bdimg.com/libs/accounting.js/0.3.2/accounting.min.js');\n    onScript('http://apps.bdimg.com/libs/alertify.js/0.3.0/alertify.min.js');\n    onScript('http://apps.bdimg.com/libs/amd.loader/0.9.0/amd.loader.js');\n    onScript('http://apps.bdimg.com/libs/angular-cookies/1.2.16/angular-cookies.js');\n    onScript('http://apps.bdimg.com/libs/angular-file-upload/1.3.1/angular-file-upload.js');\n</script> \n*/\n\nfunction onScript(url,callback) {\n\n    var script = document.createElement('script');\n\n    // callback 可以多加个参数\n    if (script.readyState) {  // 兼容IE\n        script.onreadystatechange = function () {\n            if (script.readyState == \"complete\" || script.readyState == \"loaded\") {\n                callback();\n            }\n        }\n    } else {\n        script.onload = function () {\n            callback();\n        }\n    }\n\n    // 这里写在这里是为了解决 下载太快，IE下发生错误\n    script.src = url;\n    document.head.appendChild(script);\n}\n\n\n// 挂载方法\nperformance.onScript = onScript\n\n}())\n\nmodule.exports = performance\n\n//# sourceURL=webpack:///./src/performance.js?"
		);
	},
	/*!**********************!*\
  !*** ./src/toole.js ***!
  \**********************/
	/*! no static exports found */ './src/toole.js': function(module, exports) {
		eval(
			"var toole = (function () {\n\n// 工具方法库\n\n/**\n * 优化 typeof 方法 ，使之可以返回更好的判断结果\n * { 参数一 ：传入的值 }\n */\n\nfunction type(target) {\n\n    var template = {\n        '[object Array]' : 'array',\n        '[object Object]' : 'object',\n        '[object Number]' : 'number - object',\n        '[object Boolean]' : 'boolean - object',\n        '[object String]' : 'string - object',\n        '[object Date]' : 'date',        \n    }\n    var ret = typeof(target)\n\n    if ( target === null ) {\n        return \"null\"\n    }\n\n    if ( ret === 'object' ) {    \n        var str = Object.prototype.toString.call(target);\n        return template[str];\n    } else {\n        return ret\n    }\n\n}\n\n\n/**\n * 随机生成随机数\n * { randomNum(随机数生成的范围整数) }\n */\nfunction randomNum(minNum,maxNum){ \n    switch(arguments.length){ \n        case 1: \n            return parseInt(Math.random()*minNum+1,10); \n        break; \n        case 2: \n            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); \n        break; \n            default: \n                return 0; \n            break; \n    } \n} \n\n\n/**\n * 继承方法\n * {}\n */\n\n // 分为两种\n // 1. 一种是继承构造函数，然后所有通过new \b出来的对象，就带有 多代构造函数的属性和方法\n // 2. 一种是任意对象继承，这个是混入的思想，就是将任意多个的对象继承到一个对象里面\n\n\n\n \n /**\n  * 数组去重\n  * 拓展原型链上的功能 ：使 数组Array 具有数组去重的功能\n  */\n\nArray.prototype.unique = function () {\n  var temp = {};\n  var arr = [];\n  var len = this.length;\n  for ( var i = 0 ; i < len ; i++ ){\n      if (!temp[this[i]]) {\n          temp[this[i]] = 'abc';\n          arr.push(this[i])\n      }\n  }\n  return arr;\n}\n\n\n/**\n * 对象拷贝的方法\n */\n\n\n/**\n * 事件委托方法\n * { 委托给的DOM 需要委托的DOM 事件类型 事件处理函数}\n * 例如 eventDelegate('#list', 'li', 'click', function () { console.log(this); });\n */\nfunction eventDelegate (parentSelector, targetSelector, events, foo) {\n    // 触发执行的函数\n    function triFunction (e) {\n      // 兼容性处理\n      var event = e || window.event;\n  \n      // 获取到目标阶段指向的元素\n      var target = event.target || event.srcElement;\n  \n      // 获取到代理事件的函数\n      var currentTarget = event.currentTarget;\n  \n      // 处理 matches 的兼容性\n      if (!Element.prototype.matches) {\n        Element.prototype.matches =\n          Element.prototype.matchesSelector ||\n          Element.prototype.mozMatchesSelector ||\n          Element.prototype.msMatchesSelector ||\n          Element.prototype.oMatchesSelector ||\n          Element.prototype.webkitMatchesSelector ||\n          function(s) {\n            var matches = (this.document || this.ownerDocument).querySelectorAll(s),\n              i = matches.length;\n            while (--i >= 0 && matches.item(i) !== this) {}\n            return i > -1;            \n          };\n      }\n  \n      // 遍历外层并且匹配\n      while (target !== currentTarget) {\n        // 判断是否匹配到我们所需要的元素上\n        if (target.matches(targetSelector)) {\n          var sTarget = target;\n          // 执行绑定的函数，注意 this\n          foo.call(sTarget, Array.prototype.slice.call(arguments))\n        }\n  \n        target = target.parentNode;\n      }\n    }\n  \n    // 如果有多个事件的话需要全部一一绑定事件\n    events.split('.').forEach(function (evt) {\n      // 多个父层元素的话也需要一一绑定\n      Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function ($p) {\n        $p.addEventListener(evt, triFunction);\n      });\n    });\n  }\n\n\n\n\n // 利用挂载函数，把所有的方法都挂载到全局上面  以后肯定要做一个 挂载到全局上面的方法的，只是现在还是不太清楚\nfunction guazai () {\n    window.type = type;\n    window.randomNum = randomNum;\n}\n\n// 初始化函数\nfunction init() {\n    guazai()\n}\n\ninit()\n\n}())\n\nmodule.exports = toole;\n\n//# sourceURL=webpack:///./src/toole.js?"
		);
	},
	/*!*******************!*\
  !*** ./src/zq.js ***!
  \*******************/
	/*! no static exports found */ './src/zq.js': function(module, exports) {
		eval(
			'// 自己用来封装 jQuery \n\n// 选择器部分\n\n// jQuery动画\nvar zq = (function () {\n\n}())\n\nmodule.exports = zq;\n\n//# sourceURL=webpack:///./src/zq.js?'
		);
	}
});
