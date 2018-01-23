export default {
  name: 'GetAccount',
  props: {
    user: {
      type: Object,
      default: null,
    },
    error: {
      default: null,
    },
    ready: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: {
    ErrorCard: () => import('../../../components/ErrorCard.vue'),
    UserCard: () => import('./UserCard.vue'),
  },
};
