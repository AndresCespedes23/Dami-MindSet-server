module.exports = {
  env: {
    //browser & node = true, because console said that process and console were not defined
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    //no-console & unused-var = off, because console said that 'response is defined but never used'
    "no-console": "off",
    "no-unused-vars": "off",
  },
};