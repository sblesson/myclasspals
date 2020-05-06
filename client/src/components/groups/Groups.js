import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import GroupFilters from '../common/filterpanel/FilterPanel';
import GroupCard from './GroupCard';

import PrivateMessageModal from './modal/CreateGroupModal';
import LeftNav from '../leftnav/LeftNav';
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
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <LeftNav screen='groups' />
            </div>

            <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
              <GroupFilters />
              {group !== null ? (
                <Tabs defaultActiveKey='1' tabBarExtraContent={operations}>
                  <TabPane tab='My Groups' key='1'>
                    {group.userGroup && group.userGroup.length > 0
                      ? group.userGroup.map((group, index) => (
                          <GroupCard
                            currentGroup={group}
                            key={index}
                            type='mygroups'
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
                    {group.requestedUserGroup &&
                    group.requestedUserGroup.length > 0
                      ? group.requestedUserGroup.map((group, index) => (
                          <GroupCard
                            currentGroup={group}
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
            </div>
          </div>
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
