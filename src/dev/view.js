const fs = require('fs');
const chokidar = require('chokidar');
const { createBundleRenderer } = require('vue-server-renderer');

let serverBundle;
let renderer;

const BUNDLE_PATH = './dist/vue-ssr-server-bundle.json';

function updateServerBundle() {
  return new Promise((resolve, reject) => {
    fs.readFile(BUNDLE_PATH, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        serverBundle = JSON.parse(data);
        resolve();
      }
    });
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
