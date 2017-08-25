const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
  clientManifest,
  runInNewContext: 'once',
});

module.exports = app => new Promise((resolve) => {
  app.get('*', (req, res, next) => {
    const context = {
      url: req.url,
    };

    renderer.renderToString(context, (err, html) => {
      if (err) {
        next(err);
      } else {
        const { title, link, meta } = context.meta.inject();
        res.render('app.jinja', {
          html,
          title: title.text(),
          link: link.text(),
          meta: meta.text(),
        });
      }
    });
  });
  resolve(app);
});
