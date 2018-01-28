import { mapActions } from 'vuex';
import query from './query.graphql';

export default {
  name: 'getApplication',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ready: false,
      error: null,
      app: null,
      subscription: null,
      eventID: null,
    };
  },
  components: {
    ErrorCard: () => import('../../../components/vue/ErrorCard.vue'),
    HidableText: () => import('../../../components/vue/HidableText.vue'),
  },
  errorCaptured(err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`;
    console.error(this.error);
    console.error('VM: ', vm);
    return false;
  },
  methods: mapActions({
    createState: 'process/createState',
    finishState: 'process/finishState',
    async loadClient() {
      console.debug('Load Client');
      const id = await this.createState('Loading client');
      const client = await this.$apollo.getClient();
      this.finishState(id);
      return client;
    },
    async loadApp() {
      const client = await this.loadClient();

      const observer = client.watchQuery({
        query,
        variables: {
          id: this.id,
        },
        options: {
          fetchPolicy: 'network-and-cache',
        },
      });

      this.eventID = await this.createState('Sending Query');
      observer.subscribe(
        result => this.handleResult(result),
        async (e) => {
          await this.createState({ message: 'Error Occur', type: 'error' });
          this.error = `${e.stack}\n\nfound in ${e.toString()} of component`;
          console.error(this.error);
          console.error('VM: ', this.$vm);
        },
      );
    },
    handleResult(_, { data, loading }) {
      this.app = data.app;
      this.ready = !loading;
      this.finishState(this.eventID);
      this.eventID = null;
    },
  }),
  async mounted() {
    this.loadApp();
  },
  beforeDestroy() {
    this.eventID = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  },
};
