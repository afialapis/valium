import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import scss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

import packageJSON from './package.json'
import docaineJSON from './docaine.json'

const NODE_ENV = 'production'
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');


const getPlugins= (withReplace, withTerser, withScss) => {
  let plugins= []
  if (withReplace) {
    plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      })      
    )
  }
  plugins= plugins.concat([
    babel({
      exclude: 'node_modules/**',
      /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
      babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs()  
  ])
  if (withTerser) {
    plugins.push(
      terser()
    )
  }
  if (withScss) {
    plugins.push(
      scss()
    )
  }

  return plugins
}

const forDist= (output, withReplace, withTerser) => {
  return {
    input   : './src/index.js',
    output  : output,
    external: ['react'],
    plugins : getPlugins(withReplace, withTerser, false)  
  }  
}

const forDocaine= () => {
  return {
    input   : 'demo/index.js',
    output  : {
      file: docaineJSON.demo,
      format: 'umd',
      name: 'Valium',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    },
    external: ['react', 'react-demo'],
    plugins : getPlugins(true, false, true)  
  }  
}


module.exports = [
  //
  // CommonJs
  //
  forDist({
    file: packageJSON.cjs,
    format: 'cjs'
  }, false, false),
  forDist({
    file: minifyExtension(packageJSON.cjs),
    format: 'cjs'
  }, false, true),
  //
  // ES modules
  //
  forDist({
    file: packageJSON.module,
    format: 'es',
    exports: 'named'
  }, true, false),
  forDist({
    file: minifyExtension(packageJSON.module),
    format: 'es',
    exports: 'named'
  }, true, true),  
  //
  // UMD
  //  
  forDist({
    file: packageJSON.browser,
    format: 'umd',
    name: 'Valium',
    globals: {
      'react': 'React'
    }
  }, true, false),
  forDist({
    file: minifyExtension(packageJSON.browser),
    format: 'umd',
    name: 'Valium',
    globals: {
      'react': 'React'
    }
  }, true, true), 
  //
  // Docaine
  //  
  forDocaine()  
];
