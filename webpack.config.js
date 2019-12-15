const webpack = require('webpack')
const path = require('path')

const TerserPlugin = require('terser-webpack-plugin')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  //new BundleAnalyzerPlugin({reportFileName: 'webpack_report.html'})
]


const filename = env === 'production'
  ? 'valium.min.js'
  : 'valium.js'

module.exports = {
  mode: env,
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: filename,
    library: 'Valium',
    libraryTarget: "umd"
  },
  target: 'web',
  //target: 'node',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        query: {
          cacheDirectory: false,
          presets: [
            ['@babel/preset-env', {targets: {esmodules: true}}],
            '@babel/preset-react'],
          plugins: [
            // Stage 3
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            // ["module:fast-async"]
          ]
        }
      }
    ]
  },
  optimization: {   
    minimizer: [  new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),]
  } 
}
