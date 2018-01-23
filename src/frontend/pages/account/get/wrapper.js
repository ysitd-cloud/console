import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Page from './Page.vue';
import query from './query.graphql';

export default Vue.extend({
  name: 'PageWrapper',
  render(h) {
    const data = {
      props: {
        ready: this.ready,
        error: this.error,
        user: this.user,
      },
    };
    return h(Page, data);
  },
  data() {
    return {
      user: null,
      ready: false,
      error: null,
    };
  },
  computed: mapState({
    username: state => state.user.id,
  }),
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

        this.user = data.user;
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
});
