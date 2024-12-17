module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: ['webpack.config.js'],
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 15,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    semi: 'error',
    'no-unused-vars': 'warn',
    'no-var': 'error',
    'vue/multi-word-component-names': 'off',
  },
  //   ignores: ['.eslintrc.js', '.git/'],
};
