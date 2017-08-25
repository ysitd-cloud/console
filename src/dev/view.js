const chokidar = require('chokidar');
const { createBundleRenderer } = require('vue-server-renderer');
let serverBundle = require('../../dist/vue-ssr-server-bundle.json');

const bundleCache = require.resolve('../../dist/vue-ssr-server-bundle.json');
let renderer;

const BUNDLE_PATH = './dist/vue-ssr-server-bundle.json';

function updateServerBundle() {
  return new Promise((resolve) => {
    delete require.cache[bundleCache];
    // eslint-disable-next-line global-require
    serverBundle = require('../../dist/vue-ssr-server-bundle.json');
    resolve();
  });
}

function updateRenderer() {
  return new Promise((resolve) => {
    renderer = createBundleRenderer(serverBundle, {
      runInNewContext: 'once',
    });
    resolve();
  });
}

const watcher = chokidar.watch(BUNDLE_PATH);

watcher.on('change', () => {
  updateServerBundle()
    .then(() => updateRenderer());
});

module.exports = app => updateServerBundle()
  .then(() => updateRenderer())
  .then(() => {
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
    return app;
  });
