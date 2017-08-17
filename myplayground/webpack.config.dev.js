import path from 'path';
import webpack from 'webpack';

export default {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: '/',
    publicPath: '/'
  },
  plugins: [
//    new webpack.NoErrorPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
//    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loaders: ['react-hot-loader', 'babel-loader']
      }
    ]
  },
  resolve: {
    extensions: [ ' ', '.js' ]
  }
}
