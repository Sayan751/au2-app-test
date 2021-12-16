'use strict';
/* eslint-disable */
const path = require('path');

const root = process.cwd();
const testDir = path.join(root, 'tests');
const artifactDir = path.join(testDir, '.artifacts');
const webpackConfig = {
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        /**
         * This is needed because of these issues:
         * https://github.com/webpack/webpack/issues/12759
         * https://github.com/ryanclark/karma-webpack/issues/494
         */    
        path: path.join(testDir, '_karma_webpack_', Date.now().toString()),
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.html'],
    },
    module: {
        rules: [
            { test: /\.ts$/i, loader: 'ts-loader' },
            { test: /\.html$/i, loader: 'html-loader' }
        ]
    },
};
module.exports = function (config) {
    config.set({
        basePath: process.cwd(),
        frameworks: ['mocha', 'webpack'],
        files: [
            { pattern: 'tests/**/*.spec.ts', watched: false }
        ],
        preprocessors: {
            'tests/**/*.spec.ts': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        reporters: ['mocha', 'junit'],
        junitReporter: {
            outputDir: artifactDir,
            outputFile: 'results.xml',
            useBrowserName: false,
        },
        mochaReporter: {
            showDiff: true,
        },
        port: 0,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
    })
}