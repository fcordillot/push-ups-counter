module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // indent
    'indent': ['error', 2],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1
    }],
    'no-useless-escape': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'indent': 'off',
        'vue/script-indent': ['error', 2, {
          'baseIndent': 1
        }]
      }
    }
  ]
}
