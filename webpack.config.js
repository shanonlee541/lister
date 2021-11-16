const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html'
});

module.exports = {
    entry: './client/index.js', 
    output: {
        path: path.join(__dirname, '/build'), 
        filename: 'bundle.js'
    }, 
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.jsx?/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }, 
            {
                test: /\.css/, 
                use: ["style-loader", "css-loader"]
            }
        ]
    }, 
    plugins: [htmlWebpackPluginConfig], 
    devServer: {
        static: {
            publicPath: '/build/'
        },
        port: 8080, 
        proxy: {
            '/api': 'http://localhost:3000'
        }, 
        historyApiFallback: true
    }
}