export default {
  name: 'page',
  data() {
    return {
      app: {
        name: '',
        deployment: {
          image: '',
          tag: '',
        },
        network: {
          domain: '',
        },
        environment: [],
      },
    };
  },
  methods: {
    addEnv() {
      this.app.environment.push({ key: '', value: '' });
    },
    removeEnv(i) {
      this.app.environment.splice(i, 1);
    },
  },
};
