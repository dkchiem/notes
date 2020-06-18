import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { minify } from 'html-minifier';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

import fs from 'fs';
import path from 'path';

const { preprocess } = require('./svelte.config.js');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const minifyHtml = (input, output, options) => ({
  generateBundle() {
    fs.writeFileSync(
      output,
      minify(fs.readFileSync(input).toString(), options),
    );
  },
});

export default {
  input: path.join(__dirname, 'src', 'main.js'),
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: path.join(__dirname, 'public', 'bundle.js'),
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    alias({
      entries: [
        {
          find: /@components\/(.*)\.(.*)/,
          replacement: __dirname + '/src/components/$1.$2',
        },
        {
          find: /@config\/(.*)\.(.*)/,
          replacement: __dirname + '/src/config/$1.$2',
        },
        {
          find: /@helpers\/(.*)\.(.*)/,
          replacement: __dirname + '/src/helpers/$1.$2',
        },
        {
          find: /@styles\/(.*)\.(.*)/,
          replacement: __dirname + '/src/styles/$1.$2',
        },
        {
          find: /@views\/(.*)\.(.*)/,
          replacement: __dirname + '/src/views/$1.$2',
        },
        { find: /@src\/(.*)\.(.*)/, replacement: __dirname + '/src/$1.$2' },
      ],
    }),
    svelte({
      dev,
      hydratable: true,
      emitCss: true,
      preprocess,
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    fs.writeFileSync(path.join(__dirname, 'public', 'bundle2.css'), ''),
    postcss({
      extract: path.join(__dirname, 'public', 'bundle2.css'),
      minimize: !dev,
    }),
    copy({
      targets: [
        {
          src: path.join(__dirname, 'src', 'assets', '*'),
          dest: path.join(__dirname, 'public', 'assets'),
        },
      ],
    }),
    commonjs({
      namedExports: {
        './node_modules/idb/build/idb.js': ['openDb'],
        './node_modules/firebase/dist/index.cjs.js': [
          'initializeApp',
          'firestore',
        ],
      },
    }),
    babel({
      extensions: ['.js', '.mjs', '.html', '.svelte'],
      babelHelpers: 'runtime',
      exclude: ['node_modules/@babel/**'],
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    }),
    dev &&
      copy({
        targets: [
          {
            src: path.join(__dirname, 'src', 'index.html'),
            dest: path.join(__dirname, 'public'),
          },
        ],
      }),
    dev && livereload(path.join(__dirname, 'public')),
    !dev &&
      minifyHtml(
        path.join(__dirname, 'src', 'index.html'),
        path.join(__dirname, 'public', 'index.html'),
        {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      ),
    !dev && terser(),
  ],
  watch: {
    clearScreen: true,
  },
};
