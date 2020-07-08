import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import PrivateMessageModal from './modal/CreateGroupModal';
import { Input, Card, Empty } from 'antd';
import GroupFilterPanel from '../common/filterpanel/GroupFilterPanel';
import AutoCompleteGroupSearch from '../common/autocompletegroupsearch/AutoCompleteGroupSearch';

import { searchGroup, searchGroupWithFilters } from '../../actions/group';

import GroupCard from './GroupCard';

import './DiscoverGroups.scss';

const DiscoverGroups = ({ group }) => {
  return (
    <Fragment>
      {!group ? (
        <Spinner />
      ) : (
        <div className='main-container'>
          <div
            style={{
              color: '#333',
              textAlign: 'right',
              fontWeight: 'normal',
              marginBottom: 10
            }}
          ></div>
          <Card style={{ marginBottom: 30 }} bordered={false}>
            <AutoCompleteGroupSearch />
            <div className='filter-wrapper'>
              <GroupFilterPanel />
            </div>{' '}
          </Card>
          <Card bordered={group.searchTerm?true:false}>
            {group !== null &&
            group.searchResult &&
            group.searchResult.length > 0 ? (
              group.searchResult.map((group, index) => {
                let key = 'discover_' + index;
                return (
                  <GroupCard currentGroup={group} key={key} type='discover' />
                );
              })
            ) : (
                <Empty imageStyle={{display:'none'}} description={group.searchTerm?'No results found. Check the spelling or try again with another keyword.':''} /> 
            )}
          </Card>
        </div>
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
