/**
 * @author 朱昆鹏
 * @name 性能优化库
 */

 /**
  * @name 性能优化方法列表
  * 按需加载 script 方法
  */

var performance = (function () {
    // 性能模块代码
/**
 * @name 异步加载script方法
 * { 参数一 ：需要加载的 script 地址 ，地址相对引入的epic.js而言 必填 , 参数二 ：传入一个匿名函数 里面可以才可以调用返回的内容 }
 */ 

// 使用方法演示 
/* 
<script src="./performance.js"></script>
<script>
    onScript('http://apps.bdimg.com/libs/accounting.js/0.3.2/accounting.min.js');
    onScript('http://apps.bdimg.com/libs/alertify.js/0.3.0/alertify.min.js');
    onScript('http://apps.bdimg.com/libs/amd.loader/0.9.0/amd.loader.js');
    onScript('http://apps.bdimg.com/libs/angular-cookies/1.2.16/angular-cookies.js');
    onScript('http://apps.bdimg.com/libs/angular-file-upload/1.3.1/angular-file-upload.js');
</script> 
*/

function onScript(url,callback) {

    var script = document.createElement('script');

    // callback 可以多加个参数
    if (script.readyState) {  // 兼容IE
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                callback();
            }
        }
    } else {
        script.onload = function () {
            callback();
        }
    }

    // 这里写在这里是为了解决 下载太快，IE下发生错误
    script.src = url;
    document.head.appendChild(script);
}


// 挂载方法
performance.onScript = onScript
    
}())

module.exports = performance