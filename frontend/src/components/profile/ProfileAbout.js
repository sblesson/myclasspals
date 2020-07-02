import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Button } from 'antd';
import _ from 'lodash';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import PrivateMessageModal from '../messages/modal/PrivateMessageModal';

const ProfileAbout = ({ profile: { email, userGroup, name } }) => {
  const { Text } = Typography;

  return (
    <Card
      title={
        <Ellipsis length={80} tooltip>
          {email}
        </Ellipsis>
      }
      style={{ width: '50%' }}
      extra={<PrivateMessageModal toAddress={email} />}
    >
      <div>
        <Text strong>{'My Groups'}</Text>

        {userGroup.map((group, index) => (
          <div key={index} className='p-1 m3'>
            {group.privacy === 'PRIVATE' ? (
              <span>
                <i className='fa fa-lock' title='private group'></i>&nbsp;
                {_.startCase(_.lowerCase(group.privacy))}
              </span>
            ) : (
              <span>
                <i className='fa fa-globe' title='public group'></i>
                &nbsp; {_.startCase(_.lowerCase(group.privacy))}
              </span>
            )}
            {group.groupName}
          </div>
        ))}
      </div>
    </Card>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
