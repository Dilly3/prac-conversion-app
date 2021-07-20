const Path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require ('clean-webpack-plugin')

module.exports = {
    entry: './async.js',
    output:{
        filename: 'bundle.js',
        path: Path.resolve(__dirname, 'dist'),
        publicPath: 'dist/'
    },
    mode: 'production',
    devServer: {
        index: '../index.html',
        port : 9000,
        writeToDisk : true
    },
   
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['transform-class-properties']
                    }
                }
            }
        ]
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style-laptop.css'
        }),
        new CleanWebpackPlugin({
cleanOnceBeforeBuildPatterns: [
    '**/*',
    Path.join(__dirname, 'dist/**/*')
]
        })
    ]
}