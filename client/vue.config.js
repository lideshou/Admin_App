const path=require("path");
const debug=process.env.NODE_ENV !=="production";

module.exports = {
    // 基本路径
    baseUrl: '/',
    // 输出文件目录
    outputDir: 'dist',
    assetsDir:"assets",//静态资源目录
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    runtimeCompiler:true,//运行时版本是否需要编译
    transpileDependencies:[],//默认babel-loader忽略node_modules，这里可增加例外的依赖包名
    productionSourceMap:true,//是否在构建生产包时生产sourceMap文件，false将提高构建速度
    configureWebpack: config => {
        if (debug){
            //开发环境配置
            config.devtool="cheap-module-eval-source-map";
        }else {

        }
    },
    chainWebpack:config=>{
        if (debug){
            //本地开发配置
        } else {
            //生产开发配置
        }
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    //dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            //配置跨域
            "api":{
                target:"http://localhost:5000/api/",
                ws:true,
                changeOrigin: true,
                pathRewrite:{
                    "^/api":''
                }
            }
        }, // 设置代理
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};