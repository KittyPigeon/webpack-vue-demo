module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 15,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    semi: 'error',
    // 'no-unused-vars': 'error',
    'no-var': 'error',
  },
  //   ignores: ['.eslintrc.js', '.git/'],
};
