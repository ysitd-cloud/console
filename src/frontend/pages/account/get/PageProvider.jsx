import React from 'react';
import PropTypes from 'prop-types';
import PageWithQuery from './Page';
import ApolloProvider from '../../../components/react/ApolloProvider';

export default function PageProvider({ username }) {
  return (
    <ApolloProvider>
      <PageWithQuery username={username} />
    </ApolloProvider>
  );
}

PageProvider.propTypes = {
  username: PropTypes.string.isRequired,
};