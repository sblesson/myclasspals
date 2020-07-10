import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import PrivateMessageModal from './modal/CreateGroupModal';
import { Input, Card, Empty } from 'antd';
import GroupFilterPanel from '../common/filterpanel/GroupFilterPanel';
import AutoCompleteGroupSearch from '../common/autocompletegroupsearch/AutoCompleteGroupSearch';

import { searchGroup, searchGroupWithFilters } from '../../actions/group';

import GroupCardtem from './GroupCardtem';

import './DiscoverGroups.scss';

const DiscoverGroups = ({ group }) => {
  return (
    <Fragment>
      {!group ? (
        <Spinner />
      ) : (
        <div>
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
          <Card style={{ marginBottom: 30 }} bordered={false}>
            <AutoCompleteGroupSearch />
          </Card>
          {group !== null &&
          group.searchResult &&
          group.searchResult.length > 0 ? (
            group.searchResult.map((group, index) => {
              return (
                <Card bordered={group.searchTerm ? true : false}>
                  <GroupCardtem
                    currentGroup={group}
                    key={index}
                    type='discover'
                  />
                </Card>
              );
            })
          ) : (
            <Empty
              imageStyle={{ display: 'none' }}
              description={
                group.searchTerm
                  ? 'No results found. Check the spelling or try again with another keyword.'
                  : ''
              }
            />
          )}
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
