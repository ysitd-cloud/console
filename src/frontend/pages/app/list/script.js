export default {
  name: 'list',
  props: {
    ready: {
      type: Boolean,
      required: true,
      default: false,
    },
    error: {
      default: null,
    },
    apps: {
      type: Array,
      required: true,
      default: [],
    },
  },
  components: {
    ErrorCard: () => import('../../../components/vue/ErrorCard.vue'),
    AppList: () => import('./AppList.vue'),
  },
};
