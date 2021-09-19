const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode:'production',
    entry: "./src/js/main.js",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    output:{
        path: __dirname + "/build",
        filename:"bundle.js"
    },
    devServer: {
        port: "3005"
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
            
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: "assets", to: "assets" },
              { from: "php", to :"php" },
            ],
          }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
        new HtmlWebpackPlugin(
            {
                template: "./src/index.html",
                minify:{
                    caseSensitive:true,
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    removeComments:true,
                    removeRedundantAttributes:true
                }
            }            
        ),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i  
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
          chunkFilename: "[id].css"
        })
    ]
}