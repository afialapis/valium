import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
//import replace from '@rollup/plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
//import { uglify } from 'rollup-plugin-uglify'

import packageJSON from './package.json'

//const NODE_ENV = process.env.NODE_ENV || 'development'
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');
const input = './src/index.js';


module.exports = [{
  input: input,
  output: [{
    file: packageJSON.main,
    format: 'cjs'
  },{
    file: packageJSON.module,
    format: 'es',
    exports: 'named'
  },{
    file: packageJSON.browser,
    format: 'umd',
    name: 'Valium',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes'
    }
  }
  ],
  external: id => /^react/.test(id),
  plugins: [
    /*replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),*/
    babel({
      exclude: 'node_modules/**'
    }),
    external(),
    resolve(),
    commonjs()
  ],  
},
{
  input: input,
  output: {
    file: minifyExtension(packageJSON.main),
    format: 'cjs'
  },
  external: id => /^react/.test(id),
  plugins: [
    /*replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),*/
    babel({
      exclude: 'node_modules/**'
    }),
    external(),
    resolve(),
    commonjs(),
    terser()
  ],  
},
{
  input: input,
  output: {
    file: minifyExtension(packageJSON.module),
    format: 'es',
    exports: 'named'
  },
  external: id => /^react/.test(id),
  plugins: [
    /*replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),*/
    babel({
      exclude: 'node_modules/**'
    }),
    external(),
    resolve(),
    commonjs(),
    terser()
  ],  
},
{
  input: input,
  output: {
    file: minifyExtension(packageJSON.browser),
    format: 'umd',
    name: 'Valium',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes'
    }
  },
  external: id => /^react/.test(id),
  plugins: [
    /*replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),*/
    babel({
      exclude: 'node_modules/**'
    }),
    external(),
    resolve(),
    commonjs(),
    terser()
  ],  
}
];
