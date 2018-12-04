import path from 'path';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import IndexPagePlugin from './templates/IndexPluginTemplate';

const { NODE_ENV } = process.env;
const removeEmpty = configs => configs.filter(config => config);

module.exports = () => (
  {
    entry: {
      main: './client/index.js',
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: NODE_ENV === 'production' ? '[name].[chunkhash].js' : 'main.js',
      chunkFilename: NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js',
      publicPath: '/',
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            }
          }]
        },
        {
          test: /\.(png|jpg|jpeg)$/,
          use: 'url-loader?limit=100000&name=img/[name].[ext]'
        },
        {
          test: /\.svg$/,
          use: ['babel-loader', 'svg-react-loader']
        },
        {
          test: /\.(eot|ttf|woff|woff2|ico)$/,
          use: 'file-loader?name=[name].[ext]'
        },
        {
          test: /\.css$/,
          use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
        }
      ])
    },
    resolve: {
      modules: [path.join(__dirname, 'client'), 'node_modules'],
      plugins: [PnpWebpackPlugin],
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    stats: {
      children: false,
    },
    performance: {
      maxEntrypointSize: 600000,
      maxAssetSize: 600000,
      hints: false,
    },
    plugins: removeEmpty([
      new IndexPagePlugin(),
    ])
  }
);
