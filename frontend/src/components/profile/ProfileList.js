import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, Avatar } from 'antd';
import { getAllProfiles } from '../../actions/profile';

const ProfileList = ({ getAllProfiles, profile: { profiles } }) => {
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
          onChange: (page) => {},
          pageSize: 50,
          hideOnSinglePage: true,
        }}
        dataSource={profiles}
        style={{ marginTop: '.1rem', padding: '1rem', marginLeft: '1rem' }}
        renderItem={(item) => (
          <Link /* to={`${groupUrl}${item.id}`} */>
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.avatar}
                    style={{
                      textTransform: 'uppercase',
                      background: 'blue',
                    }}
                    //className='avatar-icon'
                    shape='square'
                    icon={item.groupName.charAt(0)}
                  />
                }
              />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(ProfileList);
