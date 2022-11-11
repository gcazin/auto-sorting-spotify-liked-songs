/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  "env": {
    "node": 1
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  "rules": {
    "quotes": [2, "single", { "avoidEscape": true }]
  }
};
