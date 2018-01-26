import Vue from 'vue';
/* globals window */

export default function (tag, cls) {
  Vue.config.ignoredElements.push(tag);
  window.customElements.define(tag, cls);
}
