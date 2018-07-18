const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer: {
        port: 8080,
        contentBase: './public'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    module: {
        rules: [
            {
                test: /\.js[x]$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["react"],
                        plugins: ["babel-plugin-transform-object-rest-spread"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
                loaders: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("app.css"),
    ]
};