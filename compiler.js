'use strict';

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const terser = require('terser');

const config = {
  'plugins': [
    ['@babel/plugin-transform-typescript', {'isTSX': true}],
    ['@babel/plugin-proposal-class-properties', {'loose': true}],
    ['@babel/plugin-proposal-optional-chaining', {'loose': true}],
    ['@babel/plugin-proposal-object-rest-spread', {'loose': true, 'useBuiltIns': true}],
    '@babel/plugin-proposal-optional-catch-binding',
    '@babel/plugin-transform-arrow-functions',
    ['@babel/plugin-transform-block-scoping', {'throwIfClosureRequired': true}],
    ['@babel/plugin-transform-classes', {'loose': true}],
    ['@babel/plugin-transform-computed-properties', {'loose': true}],
    ['@babel/plugin-transform-destructuring', {'loose': true, 'useBuiltIns': true}],
    ['@babel/plugin-transform-for-of', {'assumeArray': true}],
    '@babel/plugin-transform-literals',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-shorthand-properties',
    ['@babel/plugin-transform-spread', {'loose': true}],
    ['@babel/plugin-transform-template-literals', {'loose': true}],
    '@babel/plugin-transform-member-expression-literals',
    '@babel/plugin-transform-property-literals'
  ],
}

class Compiler {
  constructor(dirname) {
    this.built = path.resolve(dirname, 'build');
  }

  read(f, b = 0, e = 0) {
    try {
      const lines = fs.readFileSync(path.join(this.built, f), 'utf8').split('\n');
      return lines.slice(b, -e).join('\n');
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`Missing file 'build/${f}' - did you run \`npm run compile\`?`);
        process.exit(1);
      }
      throw err;
    }
  }

  compile(bundled) {
    bundled = babel.transformSync(bundled, config).code;
    bundled = terser.minify(bundled).code;
    fs.writeFileSync(path.join(this.built, 'production.min.js'), bundled);
  }
}

module.exports = Compiler;