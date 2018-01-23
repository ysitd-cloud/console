import { mapActions } from 'vuex';
import Drawer from './components/Drawer.vue';
import StatusBar from './components/StatusBar.vue';


export default {
  components: {
    Drawer,
    StatusBar,
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: mapActions({
    updateEndpoint: 'env/updateEndpoint',
    updateToken: 'env/updateToken',
  }),
  metaInfo: {
    title: 'YSITD Cloud',
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'icon', sizes: '16x16', href: 'https://ysitd.cloud/logo-16x16.png' },
      { rel: 'icon', sizes: '32x32', href: 'https://ysitd.cloud/logo-32x32.png' },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { name: 'theme-color', content: '#44A148' },
    ],
  },
};
