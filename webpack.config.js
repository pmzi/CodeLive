const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: './src/js/views/index.js',
    output: {
        filename: '../src/js/dist/bundle.js',
        sourceMapFilename: './javascripts/bundle.js.map'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: { presets: ['es2015','react'] }
            }]
    }
};