import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: 'PageWrapper',
  render(h) {
    if (!this.ready) {
      return h('div', {
        attrs: {
          class: 'flex xs12',
        },
      }, [
        h('v-progress-linear', {
          props: {
            indeterminate: true,
          },
        }),
      ]);
    }

    return h('react-account-get', {
      attrs: {
        username: this.username,
      },
    });
  },
  data() {
    return {
      ready: false,
    };
  },
  computed: mapState({
    username: state => state.user.id,
  }),
  methods: mapActions({
    createState: 'process/createState',
    finishState: 'process/finishState',
    async readyClient() {
      const id = await this.createState('Loading client');
      if (!this.$apollo.isClientReady()) {
        await this.$apollo.getClient();
      }
      this.finishState(id);
      this.ready = true;
    },
  }),
  async mounted() {
    await this.readyClient();
  },
});
