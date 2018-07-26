var uglifyjs = require('uglifyjs-webpack-plugin')

module.exports = {
    // 入口
    entry : './src/epic.js', // 单页面打包
    // entry : { // 多个入口，实现多个打包
    //     demo : './src/demo.js',
    //     index : './src/index.js'
    // },

    // 输出
    output : {
        path : __dirname + '/dist', // 输出的地址,这里要是绝对路径，要不报错
        // filename : 'index.js'
        filename : 'epic.js',   // 当然我记得这里可以加上时间出 MD5 哈希 
        // publicPath : './dist' // 这个是设置图片路径的，但是有问题
    },

    mode : 'development', // 设置开发环境，development 是开发环境
    
    // 加载器 loader
    // module : {
    //     rules : [
    //         {
    //             // 这个失败，是因为没有引入到 index.js 里面，所以失败
    //             test : /.png|jpg$/,
    //             use : ['url-loader?limit=10&name./[name].[ext]'] // 需要什么加载器 npm install url-loader --save-dev
    //         },
    //         {
    //             test : /.css$/,
    //             use : ['style-loader','css-loader']
    //         }
    //     ]
    // },

    // 插件 压缩JS的插件 ：uglifyjs-webpack-plugin
    plugins : [
        new uglifyjs()  // 使用压缩JS插件
    ]
}