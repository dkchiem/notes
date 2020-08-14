import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import cleaner from 'rollup-plugin-cleaner';
import copy from 'rollup-plugin-copy';
import fs from 'fs';
import livereload from 'rollup-plugin-livereload';
import { minify } from 'html-minifier';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

const { preprocess } = require('./svelte.config.js');

const production = !process.env.ROLLUP_WATCH;
const mode = production ? 'production' : 'development';

const srcDir = path.join(__dirname, 'src');
const publicDir = path.join(__dirname, 'public');

const minifyHtml = (input, output, options) => ({
  generateBundle() {
    fs.writeFileSync(
      output,
      minify(fs.readFileSync(input).toString(), options),
    );
  },
});

export default {
  input: path.join(srcDir, 'main.js'),
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: path.join(publicDir, 'bundle.js'),
  },
  plugins: [
    cleaner({
      targets: [publicDir],
    }),
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
      dev: !production,
      emitCss: true,
      preprocess,
    }),
    postcss({
      extract: path.join(publicDir, 'bundle.css'),
      minimize: production,
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    copy({
      targets: [
        {
          src: path.join(__dirname, 'src', 'assets', '*'),
          dest: path.join(__dirname, 'public', 'assets'),
        },
      ],
    }),
    !production &&
      copy({
        targets: [
          {
            src: path.join(srcDir, 'index.html'),
            dest: publicDir,
          },
        ],
      }),
    !production &&
      serve({
        open: true,
        verbose: true,
        contentBase: 'public',
        host: 'localhost',
        historyApiFallback: true,
      }),
    !production &&
      livereload({
        watch: publicDir,
        verbose: true,
        delay: 500,
      }),
    production &&
      minifyHtml(
        path.join(srcDir, 'index.html'),
        path.join(publicDir, 'index.html'),
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
    production &&
      babel({
        babelHelpers: 'runtime',
        exclude: ['node_modules/@babel/**'],
        presets: ['@babel/preset-env'],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          ['@babel/plugin-transform-runtime', { useESModules: true }],
        ],
      }),
    production && terser(),
  ],
  watch: {
    clearScreen: true,
  },
};
