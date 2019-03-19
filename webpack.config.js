const path = require('path');

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/app.jsx',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js',
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js?x$/,
                exclude: /node_modules/,
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true, // Client side routing
        },
    };
};
