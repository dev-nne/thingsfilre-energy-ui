module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    "no-console": "off",
    indent: "off",
    semi: ["error", "always"],
    "no-trailing-spaces": 0,
    "keyword-spacing": 0,
    "no-unused-vars": 1,
    "no-multiple-empty-lines": 0,
    "space-before-function-paren": 0,
    'no-plusplus': 'off',
    quotes: [2, "double"],
    "camelcase":  'off',
    "no-use-before-define": ["error", { "variables": false }],
    "no-underscore-dangle": 'off',
    "eol-last": 0,
      'import/extensions': [ 'off', ],
      "no-tabs": 0,
    "comma-dangle": ["error", "never"],
    "operator-linebreak": [
      "error",
      "after",
      {
        overrides: {
          ":": "before"
        }
      },
    ]
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
