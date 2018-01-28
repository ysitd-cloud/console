import React from 'react';
import { graphql } from 'react-apollo';
import query from './query.graphql';
import dataProps from '../../../common/react-apollo-props';
import ProgressLinear from '../../../components/react/ProgressLinear';
import Flex from '../../../components/react/Flex';
import UserCard from './UserCard';

export function Page({ data }) {
  return (
    <Flex className="xs12">
      {data.loading ? <ProgressLinear indeterminate /> : <UserCard
        username={data.user.username}
        avatarUrl={data.user.avatarUrl}
        displayName={data.user.displayName}
      />}
    </Flex>
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
