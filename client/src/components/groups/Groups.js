import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import moment from 'moment';
import GroupFilters from '../common/filterpanel/FilterPanel';
import GroupCard from './GroupCard';

import PrivateMessageModal from './modal/CreateGroupModal';
import { getAllGroups } from '../../actions/group';
import { Tabs, Table, Tag, Button, Input } from 'antd';
import { Menu, Dropdown, message, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Groups.scss';
const Groups = ({ getAllGroups, group, auth }) => {
  const { Meta } = Card;

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);
  const { TabPane } = Tabs;

  const { Search } = Input;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const handlePageChange = e => {
    setActiveIndex(e.target.value);
  };

  const operations = <PrivateMessageModal />;

  return (
    <Fragment>
      {group.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <GroupFilters />
          {group !== null ? (
            <Tabs defaultActiveKey='1' tabBarExtraContent={operations}>
              <TabPane tab='My Groups' key='1'>
                {group.userGroup && group.userGroup.length > 0
                  ? group.userGroup.map((group, index) => (
                      <GroupCard
                        currentGroup={group}
                        key={index}
                        type='mygroup'
                      />
                    ))
                  : 'Current user is not part of any groups.'}
              </TabPane>
              <TabPane tab='Pending Invitations' key='2'>
                {group.pendingInvitedUserGroups &&
                group.pendingInvitedUserGroups.length > 0
                  ? group.pendingInvitedUserGroups.map((group, index) => (
                      <GroupCard
                        currentGroup={group}
                        key={index}
                        type='pendingInvitedUserGroups'
                      />
                    ))
                  : 'There are no pending group invitation for current user.'}
              </TabPane>
              <TabPane tab='Pending Requests' key='3'>
                {group.requestedUserGroup && group.requestedUserGroup.length > 0
                  ? group.requestedUserGroup.map((group, index) => (
                      <GroupCard
                        currentGroup={group}
                        key={index}
                        index={index}
                        type='requestedUserGroup'
                      />
                    ))
                  : 'There are no group requests initiated by the current user.'}
              </TabPane>
            </Tabs>
          ) : (
            'Group is empty'
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Groups.propTypes = {
  getAllGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getAllGroups
})(Groups);
