import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import LeftNav from '../leftnav/LeftNav';
import PrivateMessageModal from './modal/CreateGroupModal';
import { Input } from 'antd';
import GroupFilterPanel from '../common/filterpanel/GroupFilterPanel';

import { searchGroup, searchGroupWithFilters } from '../../actions/group';

import GroupCard from './GroupCard';

import './DiscoverGroups.scss';

const DiscoverGroups = ({
  group,
  searchGroup,
  searchGroupWithFilters,
  newRegistration
}) => {
  const { Search } = Input;

  return (
    <Fragment>
      {!group ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row'>
            {newRegistration ? (
              ''
            ) : (
              <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                <LeftNav screen='discovergroup' />
              </div>
            )}

            <div className='col-xs-3 col-sm-3 col-md-6 col-lg-6'>
              {newRegistration ? '' : <div style={{ marginBottom: 50 }} />}
              <Search
                placeholder='Search group'
                onSearch={value => searchGroup(value)}
                style={{ width: 300, marginBottom: 30 }}
                enterButton
              />
              <GroupFilterPanel />

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
            {newRegistration ? (
              ''
            ) : (
              <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                <PrivateMessageModal />
              </div>
            )}
          </div>
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
