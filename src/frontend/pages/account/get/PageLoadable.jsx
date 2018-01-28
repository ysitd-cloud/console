import React from 'react';
import Loadable from 'react-loadable';
import ProgressLinear from '../../../components/react/ProgressLinear';

const PageLoadable = Loadable({
  loader: () => import('./PageProvider'),
  loading: () => <ProgressLinear indeterminate />,
});

export default PageLoadable;
