import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    status
  }
}) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header>
          <Link to={`/profile/${_id}`}>{name}</Link>
        </List.Header>

        <List.Description>{status}</List.Description>
      </List.Content>
    </List.Item>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
