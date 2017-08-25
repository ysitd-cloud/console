import createApp from './app';

export default context => new Promise((resolve, reject) => {
  const { app, router } = createApp();

  context.meta = app.$meta();

  router.push(context.url);

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      reject({ code: 404 });
    } else {
      resolve(app);
    }
  }, reject);
});
