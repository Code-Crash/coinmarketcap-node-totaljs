// ===================================================
// FOR DEVELOPMENT
// Total.js - framework for Node.js platform
// https://www.totaljs.com
// ===================================================

const options = {};

options.ip = '0.0.0.0';
options.port = 8000;
options.config = { name: 'Ticker' };
// options.sleep = 3000;
// options.inspector = 9229;
// options.debugger = 40894;

require('total.js/debug')(options);