import { mapState } from 'vuex';
import query from './query.list.graphql';

export default {
  name: 'list',
  data() {
    return {
      ready: false,
      error: null,
      apps: [],
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.id,
    }),
  },
  errorCaptured(err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`;
    console.error(this.error);
    console.error('VM: ', vm);
    return false;
  },
  components: {
    ErrorCard: () => import('../../components/ErrorCard.vue'),
  },
  mounted() {
    this.$apollo.getClient()
      .then(client => client.query({ query, variables: { username: this.username } }))
      .then(({ data }) => {
        this.apps = data.user.apps;
        this.ready = true;
      });
  },
};
