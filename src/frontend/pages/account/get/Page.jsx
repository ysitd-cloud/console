import React from 'react';
import { graphql } from 'react-apollo';
import query from './query.graphql';
import dataProps from '../../../common/react-apollo-props';
import ProgressLinear from '../../../components/react/ProgressLinear';
import UserCard from './UserCard';

export function Page({ data }) {
  if (data.loading) {
    return <ProgressLinear indeterminate />;
  }
  return (
    <div className="flex xs12">
      <UserCard
        username={data.user.username}
        avatarUrl={data.user.avatarUrl}
        displayName={data.user.displayName}
      />
    </div>
  );
}

Page.propTypes = {
  data: dataProps,
};

Page.defaultProps = {
  data: null,
};

const PageWithQuery = graphql(query, {
  options: ({ username }) => ({
    variables: { username },
    fetchPolicy: 'cache-and-network',
  }),
})(Page);

export default PageWithQuery;
