/** @type {import('prettier').Config} */
const config = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  // The repo is checked out with core.autocrlf=true, so the working tree is
  // CRLF on Windows. Prettier's default of 'lf' reported every single file as
  // unformatted and made `pnpm format:check` impossible to pass here. 'auto'
  // keeps whatever the file already has and leaves line endings to git.
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
