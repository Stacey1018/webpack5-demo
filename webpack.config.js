const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"), // 绝对路径 /inke/webpacklearn/webpack5-demo
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "管理输出",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
        },
        dll: {
          name: `chunk-dll`,
          test: /[\\/]\@antv/,
          priority: 15,
          reuseExistingChunk: true,
        },
        common: {
          name: `chunk-common`,
          minChunks: 4,
          priority: -20,
          chunks: "all",
          reuseExistingChunk: true,
        },
        // 默认缓存组 当一个文件被引入超过两次的时候 也分包成一个文件
        default: {
          minChunks: 2,
          priority: -20,
          filename: "[id]_default.js",
        },
      },
    },
  },
  // runtimeChunk: "single",
};
