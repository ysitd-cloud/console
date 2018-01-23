import Vue from 'vue';
import Page from './Page.vue';

export default Vue.extend({
  name: 'pageWrapper',
  render: h => h(Page),
});
