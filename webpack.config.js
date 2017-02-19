// 配置项
var webpack = require('webpack');
module.exports = {
    // __dirname是nodejs里的一个全局变量，它指向的是我们项目的根目录
    entry:__dirname+'/app/main.js', // 唯一入口文件的路径
    output:{
        path:__dirname+'/public', //打包后的文件放置的路径
        filename:'bundle.js', //打包后的文件名
    },
    module:{
        loaders:[
            {
                test:/\.json$/,//正则匹配所有.json文件 test是一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
                loader:"json-loader" //loader的名称（必须）安装：npm install --save-dev json-loader
            },
            {
                test:/\.css$/,
                // 安装：npm install --save-dev css-loader style-loader   webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中
                // npm install --save-dev postcss-loader autoprefixer  css前缀
                loader:"style-loader!css-loader!postcss-loader" //注意这些顺序不能改
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [require('autoprefixer')];
                },
            }
        }),
        new webpack.BannerPlugin('睿客网版权所有'),//文件版本申明插件 这是webpack自带的不需要npm安装
    ],

    // 安装：npm install --save-dev webpack-dev-server
    // 运行webpack-dev-server的方式：如果是全局安装 可以直接执行命令webpack-dev-server，如果是只在本项目里安装，需要在package.json里配置scripts 然后通过npm run xxx来运行
    devServer:{
        contentBase:"./public",//本地服务器所加载的页面所在的目录
        // colors:true,//终端颜色为彩色 这一项会报错
        inline:true,//实时刷新浏览器
        host:"192.168.1.66",//配置ip地址
    }


}
