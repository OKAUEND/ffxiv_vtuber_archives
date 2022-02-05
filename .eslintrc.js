/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    // 適用する環境
    env: {
        es6: true,
        node: true,
        browser: true,
        commonjs: true,
        'jest/globals': true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
        // import 文でモジュールを使用します
        sourceType: 'module',
    },
    // React のバージョンは自動検出に
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react-hooks', 'react', '@typescript-eslint', 'jest'],
    // 基本的にルールは recommended に従う
    // prettier は配列の最後尾に書く
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    rules: {
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': [
            'warn',
            {
                additionalHooks:
                    '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
            },
        ],
    },
};
