
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
      proxy(
        "/api", {
            "target": "http://www.type-your-target.com",
            "changeOrigin": true,
            "pathRewrite": {
              // '^/api': ''
            }
        }
      ),
  );
};