import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/Spinner';
import GroupCard from './GroupCard';
import SideBar from '../sidebar/SideBar';

import CreateGroupModal from './modal/CreateGroupModal';
import { getAllGroups } from '../../actions/group';
import { Tabs, Table, Tag, Button, Input, Empty } from 'antd';
import { Layout, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Groups.scss';
const Groups = ({ getAllGroups, group, auth }) => {
  const { Meta } = Card;
  const { Content } = Layout;

  const { TabPane } = Tabs;

  const { Search } = Input;

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    getAllGroups(auth.user._id);
  }, []);

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const handlePageChange = (e) => {
    setActiveIndex(e.target.value);
  };

  const operations = <CreateGroupModal />;

  return (
    <Fragment>
      {group.loading ? (
        <Spinner />
      ) : (
        <Content className='container'>
          <SideBar />
          <div className='wrapper'>
            {group !== null ? (
              <Tabs
                defaultActiveKey='1'
                tabBarExtraContent={operations}
                mode='top'
              >
                <TabPane tab='My Groups' key='1'>
                  {group.userGroup && group.userGroup.length > 0 ? (
                    group.userGroup.map((group, index) => (
                      <GroupCard
                        currentGroup={group}
                        key={index}
                        type='mygroup'
                      />
                    ))
                  ) : (
                    <Empty
                      description={'Current user is not part of any groups.'}
                    />
                  )}
                </TabPane>
                <TabPane tab='Pending Invitations' key='2'>
                  {group.pendingInvitedUserGroups &&
                  group.pendingInvitedUserGroups.length > 0 ? (
                    group.pendingInvitedUserGroups.map((group, index) => (
                      <GroupCard
                        currentGroup={group}
                        key={index}
                        type='pendingInvitedUserGroups'
                      />
                    ))
                  ) : (
                    <Empty
                      description={
                        'There are no pending group invitation for current user.'
                      }
                    />
                  )}
                </TabPane>
                <TabPane tab='Requested To Join' key='3'>
                  {group.requestedUserGroup &&
                  group.requestedUserGroup.length > 0 ? (
                    group.requestedUserGroup.map((group, index) => (
                      <GroupCard
                        currentGroup={group}
                        key={index}
                        index={index}
                        type='requestedUserGroup'
                      />
                    ))
                  ) : (
                    <Empty
                      description={
                        'There are no group requests initiated by the current user.'
                      }
                    />
                  )}
                </TabPane>
              </Tabs>
            ) : (
              <Empty description={'No Group Data Found'} />
            )}
          </div>
        </Content>
      )}
    </Fragment>
  );
};

Groups.propTypes = {
  getAllGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllGroups,
})(Groups);
