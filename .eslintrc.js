/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          // And all your import aliases
          ['@', './src'],
          // ['@/components, './src/components'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    // 'no-undef': 1,
    'react/no-children-prop': 'warn',
    'no-case-declarations': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // should add ".ts" if typescript project
    'no-unused-vars': 'off' /* 'warn' */,
    'react/no-unescaped-entities': 'off',
    'no-console': 'off',
    'import/first': 'off',
    'import/no-cycle': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'react/display-name': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react/button-has-type': 'off',
    'func-names': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/function-component-definition': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'linebreak-style': ['off'],
    'react/jsx-no-script-url': 'warn',
    'no-script-url': 'warn',
    'jsx-a11y/tabindex-no-positive': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'react/self-closing-comp': 'warn',
    'react/jsx-curly-brace-presence': 'off',
    'jsx-a11y/alt-text': 'warn',
    'react/no-array-index-key': 'warn',
    'react/no-unstable-nested-components': 'warn',
    'no-unreachable': 'warn',
    'no-nested-ternary': 'warn',
    'react/destructuring-assignment': 'warn',
    camelcase: 'warn',
    eqeqeq: 'warn',
    'no-useless-escape': 'off',
    'import/order': 'warn',
    'no-underscore-dangle': 'warn',
    'no-empty': 'warn',
    'prefer-template': 'warn',
    'object-shorthand': 'warn',
    'no-shadow': 'warn',
    indent: [
      'warn',
      2,
      {
        SwitchCase: 2,
      },
    ],
  },
}
