import preactIslandPlugin from '@barelyhuman/preact-island-plugins/esbuild'
import autoprefixer from 'autoprefixer'

import * as esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import fs from 'fs/promises'
import process from 'node:process'
import { dirname, resolve } from 'path'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import glob from 'tiny-glob'
import * as url from 'url'
import Watcher from 'watcher'
import nodemon from 'nodemon'
import { green, dim, stripColors } from 'kolorist'

const __dirname = dirname(url.fileURLToPath(import.meta.url))

const atomic = true
let nodemonRunner
const watch = process.argv.slice(2).includes('-w')
const foldersToExclude = ['dist', '.generated', 'node_modules']
const currTime = () => String(dim(new Date().toLocaleString()))
const dimLog = msg => log(dim(msg))

// remove all ansi colors
const justText = msg => {
  // taken from https://github.com/chalk/ansi-regex/blob/02fa893d619d3da85411acc8fd4e2eea0e95a9d9/index.js
  return stripColors(msg)
}

const log = msg => {
  const time = currTime()
  const cols = process.stdout.columns
  const msgLen = justText(msg).length
  const timLen = justText(time).length
  console.log(`${msg}${' '.repeat(cols - timLen - msgLen)}${time}`)
}

const commonConfig = {
  bundle: true,
  // logLevel: 'info',
  jsx: 'automatic',
  minify: true,
  loader: {
    '.js': 'jsx',
    '.woff': 'dataurl',
    '.woff2': 'dataurl',
    '.svg': 'dataurl',
  },
  target: 'node14',
  format: 'cjs',
  jsxImportSource: 'preact',
}

async function main(options = {}) {
  const buildSuccess = green('Done')
  await server()
  log(`${buildSuccess}: Server`)
  await client()
  log(`${buildSuccess}: Client`)
  await buildPostcss()
  log(`${buildSuccess}: PostCss`)

  if (!nodemonRunner) {
    nodemonRunner = nodemon({
      script: 'dist/server.js',
      restartable: 'rs',
      ext: 'js,json,css',
      verbose: false,
      watch: ['server', 'components', 'lib', 'pages'],
    })
  }

  nodemonRunner.restart()

  watch &&
    !options.rebuild &&
    nodemonRunner
      .on('start', function () {
        log(`${buildSuccess}: Nodemon`)
      })
      .on('exit', function () {})
      .on('error', function (err) {
        console.error(err)
      })
      .on('restart', function (files) {
        dimLog(`Restarting, ${files.join(',')}`)
      })
}

async function buildPostcss() {
  const css = await fs.readFile('./styles/global.css', 'utf8')
  postcss([autoprefixer, tailwindcss])
    .process(css, { from: './styles/global.css', to: 'dist/server.css' })
    .then(result => {
      fs.writeFile('dist/server.css', result.css, () => true)
    })
}

async function client() {
  const entryPoints = await glob('./**/*.client.js', {
    absolute: true,
    cwd: './.generated',
  })
  esbuild.build({
    ...commonConfig,
    entryPoints: entryPoints,
    minify: true,
    write: true,
    metafile: true,
    splitting: true,
    // because of this, it's right now limited to esm
    // https://github.com/evanw/esbuild/issues/16
    format: 'esm',
    platform: 'browser',
    outdir: 'dist/js',
  })
}

async function server() {
  return esbuild.build({
    ...commonConfig,
    metafile: true,
    platform: 'node',
    entryPoints: ['./server.js'],
    plugins: [
      nodeExternalsPlugin(),
      preactIslandPlugin({
        clientDir: '/public/js',
        atomic,
        cwd: url.fileURLToPath(new URL('.', import.meta.url)),
      }),
    ],
    outfile: 'dist/server.js',
  })
}

try {
  await main()
} catch (err) {
  // digest
  console.log({ err })
}

const isInExclusionFolders = path =>
  foldersToExclude
    .map(x => resolve(__dirname, x))
    .filter(x => path.startsWith(x)).length > 0

if (watch) {
  const gPaths = await glob('./**/*.{js,jsx,css}', { absolute: true })

  const validPaths = gPaths.filter(x => !isInExclusionFolders(x))
  const watcher = new Watcher(validPaths)

  watcher.on('error', error => {
    // console.error(error)
  })

  watcher.on('close', () => {
    process.exit(0)
  })

  watcher.on('change', async () => {
    try {
      await main({ rebuild: true })
    } catch (err) {
      // digest
    }
  })
}
