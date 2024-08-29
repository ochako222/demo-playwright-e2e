import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    {
        files: ['**/*.js', '**/*.ts'],
        rules: {
            'no-empty-pattern': ['warn']
        }
    },

    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json']
            }
        }
    },

    { ignores: ['node_modules/', 'lib/', 'report/'] }
];
