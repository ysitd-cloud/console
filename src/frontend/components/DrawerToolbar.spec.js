import { shallow } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';

import DrawerToolbar from './DrawerToolbar.vue';

/* globals describe, it, expect */

describe('Component DrawerToolbar', () => {
  it('matches snapshot', () => {
    const renderer = createRenderer();
    const wrapper = shallow(DrawerToolbar, {
      propsData: { photo: 'foo.jpg', displayName: 'bar' },
    });
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err);
      expect(str).toMatchSnapshot();
    });
  });
});
