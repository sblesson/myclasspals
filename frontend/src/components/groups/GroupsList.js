import React, { Fragment } from 'react';
import { Divider, List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const GroupsList = ({ groupList, heading, groupUrl, iconColor }) => {
  return (
    <>
      <Divider orientation='left'>{heading}</Divider>

      <List
        itemLayout='vertical'
        size='small'
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 50,
          hideOnSinglePage: true,
        }}
        dataSource={groupList}
        style={{ marginTop: '1rem', padding: '1rem', marginLeft: '1rem' }}
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
                title={item.groupName}
                description={
                  <Ellipsis length={40} tooltip>
                    {item.privacy.toLowerCase()}
                  </Ellipsis>
                }
              />
            </List.Item>
          </Link>
        )}
      />
    </>
  );
};

export default GroupsList;
