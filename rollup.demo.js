import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
//import external from 'rollup-plugin-peer-deps-external'
import scss from 'rollup-plugin-scss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const NODE_ENV = 'development'
export default {
  input: 'demo/src/Demo.js',
  output: {
    file: 'demo/dist/bundle.js',
    format: 'umd',
    name: 'Valium',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes'
    }
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),    
    babel({
      exclude: 'node_modules/**',
      /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
      babelHelpers: 'runtime'
    }),
    resolve(),
    //external(['react', 'prop-types']),
    //external([/@babel\/runtime/, 'react', 'prop-types']),    
    commonjs(),
    scss(),
    serve({
      contentBase: './demo',
      host: 'localhost',
      port: 3000,      
    }),
    
    livereload({
      watch: '',
      port: 3001,
      verbose: true,
      delay: 200
    })
  ]
}