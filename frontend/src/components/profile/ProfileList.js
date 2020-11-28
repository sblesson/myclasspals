import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { List, Avatar } from 'antd';
import { getAllUsers } from '../../actions/profile';

const ProfileList = ({ getAllUsers, auth }) => {
  const isCurrent = useRef(true);

  useEffect(() => {
    if (isCurrent.current) {
      getAllProfiles((cancelTokenSrc) => {
        cancelTokenSrc.cancel();
      });
    }
    return () => {
      //cleanup
    };
  }, []);

  useEffect(() => {
    return () => {
      //called when component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  return (
    <div style={{ height: '80vh', width: '95vw', margin: '2rem auto' }}>
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
        dataSource={profileList}
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
                description={}
              />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllUsers })(ProfileList);
