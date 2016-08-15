process.env.BABEL_ENV = 'test'; //corresponds to env in babelrc
const webpackConfig = require('./webpack.config');

// Karma configuration
module.exports = function (config) {
    config.set({
        // ... normal karma configuration
        frameworks: ['mocha', 'chai'],
        files: [
            // all files ending in "_test"
            {pattern: 'src/**/*.test.js', watched: false}
        ],
        preprocessors: {
            // add webpack as preprocessor
            'src/**/*.test.js': ['webpack']
        },
        reporters: ['progress', 'coverage'],
        webpack: webpackConfig,
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },
        coverageReporter: {
            reporters: [
                {type: 'lcov', dir: 'coverage/', subdir: '.'},
                {type: 'json', dir: 'coverage/', subdir: '.'},
                {type: 'text-summary'}
            ]
        },
        browsers: ['Chrome'],
        autoWatch: false,
        singleRun: true,
        color: true
    });
};
