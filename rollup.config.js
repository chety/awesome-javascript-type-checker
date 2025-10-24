import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const createConfig = (format, minify = false) => ({
  input: 'src/index.js',
  output: {
    file: `lib/index${format === 'esm' ? '.esm' : ''}${minify ? '.min' : ''}.js`,
    format,
    name: format === 'umd' ? 'TypeChecker' : undefined,
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { targets: { node: '12' } }]],
    }),
    ...(minify ? [terser()] : []),
  ],
});

export default [
  // CommonJS
  createConfig('cjs'),
  createConfig('cjs', true),
  
  // ES Module
  createConfig('esm'),
  createConfig('esm', true),
  
  // UMD
  createConfig('umd'),
  createConfig('umd', true),
];
