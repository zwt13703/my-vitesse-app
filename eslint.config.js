// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    pnpm: true,
  },
  {
    rules: {
      'unicorn/no-instanceof-builtins': 'off',
    },
  },
)
