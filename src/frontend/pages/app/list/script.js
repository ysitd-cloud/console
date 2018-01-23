import { mapState, mapActions } from 'vuex';
import query from './query.graphql';

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
    ErrorCard: () => import('../../../components/ErrorCard.vue'),
  },
  methods: mapActions({
    createState: 'process/createState',
    finishState: 'process/finishState',
    async loadApps() {
      try {
        let id = await this.createState('Loading client');
        const client = await this.$apollo.getClient();
        this.finishState(id);

        id = await this.createState('Sending Query');
        const { data } = await client.query({
          query,
          variables: { username: this.username },
        });
        this.finishState(id);

        this.apps = data.user.apps;
        this.ready = true;
      } catch (e) {
        await this.createState({ message: 'Error Occur', type: 'error' });
        this.error = `${e.stack}\n\nfound in ${e.toString()} of component`;
        console.error(this.error);
        console.error('VM: ', this);
      }
    },
  }),
  async mounted() {
    this.loadApps();
  },
};
