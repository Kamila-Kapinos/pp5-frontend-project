
var winston = require('winston'); //(1)

function logProvider() {
//(2)
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}

var PROXY_CONF = {
  '/api': {
    target: 'http://127.0.0.1:9999',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    headers: {
      Connection: 'keep-alive',
    },
    // pathRewrite: {
    //   '^/api': '',
    // },
  },
}

module.exports = PROXY_CONF;
