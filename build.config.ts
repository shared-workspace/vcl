import { defineBuildConfig } from 'unbuild'
import path from 'path'

export default defineBuildConfig({
  declaration: true,
  rollup: {
    inlineDependencies: true,
    resolve: {
      exportConditions: ['production', 'node'] as any,
    },
  },
  alias: {
    '@command-shared': path.resolve(__dirname, 'src/commands/_shared'),
    '@package-json': path.resolve(__dirname, 'package.json'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  },
  entries: ['src/index'],
  externals: [
    // 'fsevents',
    'node:url',
    'node:buffer',
    'node:path',
    'node:child_process',
    'node:process',
    'node:os',
  ],
})