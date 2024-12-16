const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ZipPlugin = require('./config/plugins/zip')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    // entry: {
    //     page1:path.resolve(__dirname, "src/page1/index.js"),
    //     page1:path.resolve(__dirname, "src/page2/index.js")
    // },
    mode:'development',
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        // publicPath: "./",
        filename: "[name].[contenthash:8].js",
    },
    devtool: "source-map",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        extensions: [".jsx", ".js", ".vue"],
    },
    devServer: {
        // static: {
        //     directory: path.resolve(__dirname, "./dist"),
        // },
        static: {
            // 文件地址
            directory: path.resolve(__dirname, 'dist')
        },
        // 开启 gzip 压缩
        compress: true,
        open: true,
        // 服务器 端口 9000
        host:'localhost',
        port: 9000,
        // 热更新
        hot: true,
    },
    optimization: {
        // usedExports: true, // 启用treeShaking
        splitChunks: {
            chunks: 'all',
            minSize: 20000, // 生成chunk的最小大小（以字节为单位）
            minChunks: 1, // 分割前必须共享模块的最小块数
            maxAsyncRequests: 30, // 按需加载时的最大并行请求数
            maxInitialRequests: 30, // 入口点的最大并行请求数
            automaticNameDelimiter: '~', // 默认情况下，webpack将使用块的来源和名称生成名称（例如vendors~main.js）
            cacheGroups: { // 缓存组可以继承或覆盖splitChunks.*的任何选项
                vendors: {
                    test: /[\/]node_modules[\/]/, // 控制哪些模块被这个缓存组选中
                    priority: -10 // 一个模块可以属于多个缓存组。优化将优先考虑具有更高优先级的缓存组
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true // 如果当前块包含已经从主束分离出的模块，则将重用它而不是生成新的块
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                    }
                },
            },
            {
                test: /\.(less|css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|svg|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024, // 100kb  这个从 b开始计算的 所以需要 相乘计算下
                    },
                },

                generator: {
                    filename: "static/assets/[name].[contenthash:8][ext]"
                }
            },


        ],
    },
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        new HtmlWebpackPlugin({
            // filename:'page1.html',
            template: path.resolve(__dirname, 'index.html'),
            // chunks:['page1']
        }),
        // new HtmlWebpackPlugin({
        //     filename:"page2.html",
        //     template: path.resolve(__dirname, './public/index2.html'),
        //     chunks:['page2']
        // }),
        new ZipPlugin({
            filename: "hello.zip"
        }),
        new MiniCssExtractPlugin({
            filename: "styles/chunk-[contenthash].css", // 将css代码输出到 输出目录/styles文件夹下 也是以 chunk + hash的方式
            ignoreOrder: true, // 禁用 css order 警告
        }),
        // new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        
    ],
};
