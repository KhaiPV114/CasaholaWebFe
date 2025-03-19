const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        // configure: (webpackConfig) => {
        //     if (process.env.NODE_ENV === 'production') {
        //       webpackConfig.devtool = false; production
        //     }
        //     return webpackConfig;
        //   },
      
    },
};

