import createApp from './app';

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();

  store.dispatch('user/update', context.user);
  store.dispatch('oauth/refreshToken', {
    accessToken: context.user.oauth.accessToken,
  });

  context.meta = app.$meta();

  router.push(context.url);

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      reject({ code: 404 });
    } else {
      Promise.all(matchedComponents.map((Component) => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            router,
            route: router.currentRoute,
            user: context.user,
          });
        }
        return Promise.resolve(null);
      }))
        .then(() => {
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }
  }, reject);
});
