import babel from '@rollup/plugin-babel'
//import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import nodePolyfills from 'rollup-plugin-node-polyfills'

const NODE_ENV = 'development'

export default {
  input: 'test/test_01.js',
  output: {
    file: 'test/bundle.js',
    format: 'umd',
    name: 'Valium',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      /*'prop-types/checkPropTypes': 'checkPropTypes',
      'es6-promise': 'ES6Promise'  */    
    }   
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    babel({
      exclude: 'node_modules/**',
      /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
      babelHelpers: 'bundled'
    }),
    //external([/@babel\/runtime/, 'react', 'react-dom', 'prop-types', 'prop-types/checkPropTypes']),
    resolve(/*{
      browser: true,
      preferBuiltins: false
    }*/),
    commonjs(/*{
      esmExternals: ['es6-promise'],
      include: 'node_modules/**'

    }*/),
    nodePolyfills()
  ]
}
