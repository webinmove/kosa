export default {
  input: 'src/index.js',
  output: [{
    format: 'cjs',
    file: './dist/index.cjs'
  }, {
    format: 'esm',
    file: './dist/index.mjs'
  }]
};
