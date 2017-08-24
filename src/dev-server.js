const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: `
  <!doctype html>
  <html>
  <head>{{{ meta }}} <title>{{ title }}</title></head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
  </html>
  `,
});

module.exports = function bindDev(app) {
  app.get('*', (req, res, next) => {
    const context = {
      url: req.url,
      title: 'testing',
      meta: '<meta charset="UTF-8">',
    };

    renderer.renderToString(context, (err, html) => {
      if (err) {
        next(err);
      } else {
        res.end(html);
      }
    });
  });
};
