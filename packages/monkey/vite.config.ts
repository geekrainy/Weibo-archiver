import path from 'node:path'
import { defineConfig } from 'vite'
import monkey, { cdn } from 'vite-plugin-monkey'
import config, { root } from '../../vite.config'

const { plugins } = config

export default defineConfig({
  ...config,
  build: {
    outDir: path.resolve(root, 'dist'),
  },
  plugins: [
    ...plugins!,
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'Weibo Archiver',
        homepage: 'https://github.com/Chilfish/Weibo-Archiver',
        source: 'https://github.com/Chilfish/Weibo-Archiver/tree/main/packages/monkey',
        icon: 'https://github.com/Chilfish/Weibo-archiver/raw/main/docs/Speechless48.webp',
        namespace: 'chilfish/monkey',
        match: [
          'https://weibo.com/u/*',
          'https://weibo.com/n/*',
        ],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          pinia: [
            'Pinia',
            'https://unpkg.com/vue-demi@latest/lib/index.iife.js',
            version =>
              `https://unpkg.com/pinia@${version}/dist/pinia.iife.js`,
          ],
        },
        externalResource: {
          'element-plus/dist/index.mini.css': cdn.unpkg(),
        },
        fileName: 'weibo-archiver.user.js',
      },
    }),
  ],
})