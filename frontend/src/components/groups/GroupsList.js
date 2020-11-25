import React, { Fragment } from 'react';
import { Divider, List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import _ from 'lodash';

const GroupsList = ({ groupList, heading, groupUrl, iconColor }) => {
  console.log('inside GroupsList', groupList);

  const getGroupNamePrivacyIcon = (groupName, privacy) => {
    if (privacy) {
      let groupPrivacy = privacy.toLowerCase();
      groupPrivacy = _.startCase(groupPrivacy);

      if (privacy === 'PRIVATE') {
        return (
          <span>
            <i className='fa fa-lock' title='private group'></i>&nbsp;
            {groupName}
          </span>
        );
      } else {
        return (
          <span>
            <i className='fa fa-globe' title='public group'></i>
            &nbsp;{groupName}
          </span>
        );
      }
    }
  };

  return (
    <>
      <Divider orientation='left'>{heading}</Divider>

      <List
        itemLayout='vertical'
        size='small'
        pagination={
          false /* {
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 50,
          hideOnSinglePage: true,
        } */
        }
        dataSource={groupList}
        style={{ marginTop: '.1rem', padding: '1rem', marginLeft: '1rem' }}
        renderItem={(item) => (
          <Link to={`${groupUrl}${item.id}`}>
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.avatar}
                    style={{
                      textTransform: 'uppercase',
                      background: iconColor,
                    }}
                    //className='avatar-icon'
                    shape='square'
                    icon={item.groupName.charAt(0)}
                  />
                }
                description={getGroupNamePrivacyIcon(
                  item.groupName,
                  item.privacy
                )}
              />
            </List.Item>
          </Link>
        )}
      />
    </>
  );
};

export default GroupsList;
