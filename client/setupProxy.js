const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.18.24:3000', // Replace with the URL of your Solidity backend
      changeOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*' // Allow requests from any origin
      }
    })
  );
};