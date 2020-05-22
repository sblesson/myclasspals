import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Row, Col, Divider, Card, Input } from 'antd';

import LeftNav from '../leftnav/LeftNav';
import PrivateMessageModal from '../groups/modal/CreateGroupModal';
import GroupFilterPanel from '../common/filterpanel/GroupFilterPanel';
import AutoCompleteGroupSearch from '../common/autocompletegroupsearch/AutoCompleteGroupSearch';

import { searchGroup, searchGroupWithFilters } from '../../actions/group';

import GroupCard from '../groups/GroupCard';

import './DiscoverGroups.scss';

const DiscoverGroups = ({ group, searchGroup, searchGroupWithFilters }) => {
  const { Search } = Input;

  return (
    <Fragment>
      {!group ? (
        <Spinner />
      ) : (
        <Fragment>
          <Row>
            <Col md={{ span: 12, offset: 6 }}>
              <Divider
                orientation='right'
                style={{ color: '#333', fontWeight: 'normal' }}
              >
                <PrivateMessageModal />
              </Divider>
              <Card style={{ textAlign: 'center' }}>
                <Search
                  placeholder='Search group'
                  onSearch={value => searchGroup(value)}
                  style={{ width: 300, marginBottom: 30 }}
                  enterButton
                />
                <div className='filter-wrapper'></div>{' '}
                <div
                  style={{ textAlign: 'center', marginLeft: 80, marginTop: 30 }}
                >
                  {group !== null &&
                  group.searchResult &&
                  group.searchResult.length > 0
                    ? group.searchResult.map((group, index) => (
                        <GroupCard
                          currentGroup={group}
                          key={index}
                          type='discover'
                        />
                      ))
                    : ''}
                </div>
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
  group: state.group
});

export default connect(mapStateToProps, {
  searchGroup,
  searchGroupWithFilters
})(DiscoverGroups);
