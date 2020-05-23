import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Row, Col, Div, Divider, Card, Input, Empty } from 'antd';

import LeftNav from '../leftnav/LeftNav';
import PrivateMessageModal from '../groups/modal/CreateGroupModal';
import GroupFilterPanel from '../common/filterpanel/GroupFilterPanel';
import AutoCompleteGroupSearch from '../common/autocompletegroupsearch/AutoCompleteGroupSearch';

import { searchGroup, searchGroupWithFilters } from '../../actions/group';

import GroupCard from '../groups/GroupCard';
import { RightCircleFilled } from '@ant-design/icons';

/* import './DiscoverGroups.scss';
 */
const DiscoverGroups = ({ group, auth, history }) => {
  const { Search } = Input;
  useEffect(() => {
    if (auth && auth.user) {
      console.log(auth.user);

      let user = auth.user;
      if (user.userGroup && user.userGroup.length > 0) {
        history
          ? history.push('/dashboard')
          : (window.location.pathname = '/dashboard');
      } else if (
        user.requestedUserGroup &&
        user.requestedUserGroup.length > 0
      ) {
        history
          ? history.push('/groups')
          : (window.location.pathname = '/groups');
      }
    }
  }, [auth]);

  return (
    <Fragment>
      {!group ? (
        <Spinner />
      ) : (
        <Fragment>
          <Row>
            <Col xs={{ span: 4 }} md={{ span: 12, offset: 6 }}>
              <div
                style={{
                  color: '#333',
                  textAlign: 'right',
                  fontWeight: 'normal',
                  marginBottom: 10
                }}
              >
                <PrivateMessageModal />
              </div>
              <Card style={{ marginBottom: 30 }}>
                <AutoCompleteGroupSearch />
                <div className='filter-wrapper'>
                  <GroupFilterPanel />
                </div>{' '}
              </Card>
              <Card>
                {group !== null &&
                group.searchResult &&
                group.searchResult.length > 0 ? (
                  group.searchResult.map((group, index) => (
                    <GroupCard
                      currentGroup={group}
                      key={index}
                      type='discover'
                    />
                  ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Card>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

DiscoverGroups.propTypes = {
  searchGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, {
  searchGroup,
  searchGroupWithFilters
})(DiscoverGroups);
