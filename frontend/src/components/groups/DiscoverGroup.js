import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import PrivateMessageModal from './modal/CreateGroupModal';
import { List, Card, Empty } from 'antd';
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
            <List
              itemLayout='vertical'
              size='small'
              header={
                group.searchTerm
                  ? `Groups based on your search`
                  : 'Groups near you'
              }
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3
              }}
              dataSource={group.searchResult}
              //style={{ overflow: 'hidden' }}
              renderItem={item => (
                <Card
                  key={`${item.id}-card`}
                  hoverable={true}
                  bordered={group.searchTerm ? true : false}
                >
                  <GroupCardtem currentGroup={item} type='discover' />
                </Card>
              )}
            />
          ) : (
            <Empty
              description={
                group.searchTerm
                  ? 'No results found. Check the spelling or try again with another keyword.'
                  : 'No groups found'
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
