const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        pubsub: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWepackPlugin({
            template: 'index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node-modules/, loader: 'babel-loader'}
        ]
    }
}