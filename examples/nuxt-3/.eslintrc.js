module.exports = {
    extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended'],
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        curly: ['error', 'multi-line'],
        indent: ['error', 4],
        semi: [2, 'always'],
        'arrow-parens': [2, 'always'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'vue/comment-directive': 'off',
        'vue/html-indent': ['error', 4],
        'vue/no-unused-components': 'off',
        'vue/no-v-html': 'off',
        'vue/require-component-is': 'off',
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 1,
                switchCase: 1,
                ignores: [],
            },
        ],
        'vue/singleline-html-element-content-newline': 'off',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
    ],
};
