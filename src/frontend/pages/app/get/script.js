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
    };
  },
  components: {
    ErrorCard: () => import('../../../components/ErrorCard.vue'),
    HidableText: () => import('../../../components/HidableText.vue'),
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
  }),
  async mounted() {
    try {
      let id = await this.createState('Loading client');
      const client = await this.$apollo.getClient();
      this.finishState(id);

      id = await this.createState('Sending Query');
      const { data } = await client.query({ query, variables: { id: this.id } });
      this.finishState(id);

      this.app = data.app;
      this.ready = true;
    } catch (e) {
      await this.createState({ message: 'Error Occur', type: 'error' });
      this.error = `${e.stack}\n\nfound in ${e.toString()} of component`;
      console.error(this.error);
      console.error('VM: ', this.$vm);
    }
  },
};
