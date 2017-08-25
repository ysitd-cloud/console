const chokidar = require('chokidar');
const { createBundleRenderer } = require('vue-server-renderer');
const assets = require('../../dist/assets.json');
let serverBundle = require('../../dist/vue-ssr-server-bundle.json');

const bundleCache = require.resolve('../../dist/vue-ssr-server-bundle.json');
let renderer;

const assetsNames = ['manifest', 'vendor', 'app'];
const styles = assetsNames.reduce((links, name) => {
  if (name in assets && 'css' in assets[name]) {
    links.push(assets[name].css);
  }
  return links;
}, []);

const scripts = assetsNames.reduce((list, name) => {
  if (name in assets && 'js' in assets[name]) {
    list.push(assets[name].js);
  }
  return list;
}, []);

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
            scripts,
            styles,
            title: title.text(),
            link: link.text(),
            meta: meta.text(),
          });
        }
      });
    });
    return app;
  });
