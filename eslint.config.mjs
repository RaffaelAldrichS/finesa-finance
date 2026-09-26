import js from '@eslint/js'
import next from 'eslint-config-next'
import tseslint from 'typescript-eslint'

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', '.codegraph/**', 'pnpm-lock.yaml'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...next,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
]

export default config
