import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../components/react/Card';
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
          <div className="card__title pb-0">
            <div className="headline mb-0">
              <span className="bold">Name: </span>{ displayName }
            </div>
          </div>
          <div className="card__text pt-1">
            <div><span className="bold">Username: </span>{ username }</div>
          </div>
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
