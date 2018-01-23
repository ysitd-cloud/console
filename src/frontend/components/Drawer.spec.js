import { shallow, mount, createLocalVue } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import Vuex, { Store } from 'vuex';

import Drawer from './Drawer.vue';

/* globals describe, it, expect, jest, beforeEach */

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Component DrawerToolbar', () => {
  let store;
  let photoGetter;

  beforeEach(() => {
    photoGetter = jest.fn();
    store = new Store({
      modules: {
        user: {
          namespaced: true,
          state: {
            displayName: 'foo',
          },
          getters: {
            photo: photoGetter,
          },
        },
      },
    });
  });

  it('is a Vue instance', () => {
    const wrapper = mount(Drawer, {
      store,
      localVue,
      propsData: { drawer: true },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('matches snapshot for display', () => {
    const renderer = createRenderer();
    const wrapper = shallow(Drawer, {
      store,
      localVue,
      propsData: { drawer: true },
    });
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err);
      expect(str).toMatchSnapshot();
    });
  });
});
