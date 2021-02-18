
const baseConfig = require('./wdio.conf').config;
const BASE_URL="www.bunnings.com.au"


const uatconfig = Object.assign(baseConfig, {
    
    beforeSession: function (config, capabilities, specs) {
        config.baseUrl = BASE_URL
     },

});

exports.config = uatconfig;
