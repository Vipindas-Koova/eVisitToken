//entry point
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(__dirname);

module.exports = (env) => {
    const isproduction = env === "production";
    const CSSExtract = new ExtractTextPlugin('style.css');
    console.log('env', env);
    return {
        entry: './src/index.js', //relative path
        output: {
            path: path.join(__dirname, 'public','dist'),  //absolute path
            filename: 'bundle.js' // can be any name
        },
        //loader files(for js files)
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract(
                    {
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                            
                        ]
                    }
                )
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isproduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),  //absolute path
            historyApiFallback: true,
            publicPath:'/dist/'
        }
    };
}

//output file


