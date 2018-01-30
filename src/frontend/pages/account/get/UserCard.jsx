import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../components/react/Card';
import CardTitle from '../../../components/react/CardTitle';
import CardText from '../../../components/react/CardText';
import Flex from '../../../components/react/Flex';
import Row from '../../../components/react/Row';

export default function UserCard({ avatarUrl, displayName, username }) {
  return (
    <Card>
      <Row>
        <Flex className="xs12 md2 lg1">
          <img src={avatarUrl} alt="Avatar Icon" style={{ minHeight: '50px' }} />
        </Flex>
        <Flex className="xs12 md8 lg11">
          <CardTitle className="pb-0">
            <div className="headline mb-0">
              <span className="bold">Name: </span>{ displayName }
            </div>
          </CardTitle>
          <CardText className="pt-1">
            <div><span className="bold">Username: </span>{ username }</div>
          </CardText>
        </Flex>
      </Row>
    </Card>
  );
}

UserCard.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
