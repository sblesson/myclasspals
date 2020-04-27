import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import LeftNav from '../leftnav/LeftNav';
import { requestToJoinUserGroup } from '../../actions/group';
import PrivateMessageModal from './modal/CreateGroupModal';
import { Card, Avatar, Tabs, Table, Tag, Button, Input } from 'antd';

import { searchGroup } from '../../actions/group';
import './DiscoverGroups.scss';

const DiscoverGroups = ({
  loading,
  auth,
  group,
  searchGroup,
  requestToJoinUserGroup
}) => {
  const { Meta } = Card;

  const { Search } = Input;

  const requestToJoinUserGroupClickHandler = record => {
    requestToJoinUserGroup({
      groupId: record.id,
      role: 'member',
      requestorUserId: auth.user.email,
      origin: 'discovergroup'
    });
  };

  const isLoggedInUserJoinedUserGroup = group => {
    let isUserJoinedGroup = false;
    let memberArr = [];
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    if (group && group.userGroupMembers && group.userGroupMembers.length > 0) {
      memberArr = group.userGroupMembers.filter(item => {
        return item._id === userId;
      });
    }
    if (memberArr && memberArr.length > 0) {
      //current user is already part of group
      isUserJoinedGroup = true;
    }
    return isUserJoinedGroup;
  };

  const groupActionMenu = group => {
    //if user part of user group
    let isMemberUserGroup = isLoggedInUserJoinedUserGroup(group);

    if (!isMemberUserGroup && !group.isRequestUserGroupSuccess) {
      return (
        <Button
          type='link'
          style={{ marginRight: 16 }}
          onClick={() => requestToJoinUserGroupClickHandler(group)}
        >
          {' '}
          Join
        </Button>
      );
    } else if (isMemberUserGroup) {
      return <Tag color={'green'}>{'Joined'}</Tag>;
    }
  };

  return (
    <Fragment>
      {!group ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <LeftNav screen='discovergroup' />
            </div>
            <div className='col-xs-3 col-sm-3 col-md-6 col-lg-6'>
              <Search
                placeholder='Search group'
                onSearch={value => searchGroup(value)}
                style={{ width: 300, marginBottom: 30 }}
                enterButton
              />
              {group !== null &&
              group.searchResult &&
              group.searchResult.length > 0
                ? group.searchResult.map((group, index) => (
                    <Card
                      key={index}
                      style={{
                        width: 300,
                        marginBottom: 16
                      }}
                      actions={[
                        <div className='member-count'>
                          {group.userGroupMembers.length === 1
                            ? group.userGroupMembers.length + ' member'
                            : group.userGroupMembers.length + ' members'}{' '}
                        </div>,
                        null,
                        groupActionMenu(group)
                      ]}
                    >
                      <Link to={`/group/${group.id}`}>
                        <Meta
                          avatar={<i className='fas fa-users icon-group'></i>}
                          title={group.groupName}
                          description={group.description}
                        />
                      </Link>
                    </Card>
                  ))
                : ''}
            </div>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <PrivateMessageModal />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

DiscoverGroups.propTypes = {
  searchGroup: PropTypes.func.isRequired,
  requestToJoinUserGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, {
  searchGroup,
  requestToJoinUserGroup
})(DiscoverGroups);
