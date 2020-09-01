import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from 'antd';
import _ from 'lodash';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import PrivateMessageModal from '../messages/modal/PrivateMessageModal';
import './ProfileAbout.scss';
const ProfileAbout = ({ profile: { email, userGroup, name } }) => {
  const [publicGroup, setPublicGroups] = useState([]);
  const [privateGroup, setPrivateGroups] = useState([]);

  const getGroup = () => {
    let myPublicGroup = [];
    let myPrivateGroup = [];
    userGroup.map((group, index) => {
      if (group.privacy === 'PRIVATE') {
        myPrivateGroup.push(group);
      } else {
        myPublicGroup.push(group);
      }
    });

    setPublicGroups(myPublicGroup);
  };
  useEffect(() => {
    getGroup();
    return () => {
      //cleanup
    };
  }, [userGroup]);
  const publicGroupItems = publicGroup.map((item) => (
    <div key={`public-${item.id}`}>{item.groupName}</div>
  ));
  const privateGroupItems = privateGroup.map((item) => (
    <div key={`private-${item.id}`}>{item.groupName}</div>
  ));
  return (
    <Card
      className='profile-card'
      title={
        <Ellipsis length={80} tooltip>
          {email ? email : ''}
        </Ellipsis>
      }
      extra={<PrivateMessageModal toAddress={email} />}
    >
      {privateGroup && privateGroup.length > 0 && (
        <div>
          <span>
            <i className='fa fa-lock privacy-icon' title='private group'></i>
            Private Groups
          </span>

          <div className='groups-wrapper'>{privateGroupItems}</div>
        </div>
      )}
      {publicGroup && publicGroup.length > 0 && (
        <div>
          <span>
            <i className='fa fa-globe privacy-icon' title='private group'></i>
            Public Groups
          </span>
          <div className='groups-wrapper'>{publicGroupItems}</div>
        </div>
      )}
    </Card>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
