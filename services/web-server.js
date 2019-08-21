const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');
const morgan = require('morgan');

let httpServer;

async function initialize() {
  const app = express();
  httpServer = http.createServer(app);

  // Combines logging info from request and response
  app.use(morgan('combined'));

  app.use('/api', router);

  httpServer.listen(webServerConfig.port)
    .on('listening', () => {
      console.log(`Web server listening on localhost:${webServerConfig.port}`);

      return;
    })
    .on('error', err => {
      console.error(err);
      return;
    });

}

// *** previous code above this line ***

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
        if (err) {
            reject(err);
            return;
        }

        resolve();
        });
    });
}
  

module.exports.close = close;
module.exports.initialize = initialize;