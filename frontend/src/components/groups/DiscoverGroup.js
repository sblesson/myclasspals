import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner/Spinner';
import CreateGroupModal from './modal/CreateGroupModal';
import { List, Card, Empty } from 'antd';
import GroupFilterPanel from '../common/filterpanel/GroupFilterPanel';
import AutoCompleteGroupSearch from '../common/autocompletegroupsearch/AutoCompleteGroupSearch';
import { searchGroup, searchGroupWithFilters } from '../../actions/group';

import GroupCard from './GroupCard';

import './DiscoverGroups.scss';

const DiscoverGroups = ({ group, newRegistration }) => {
  const [visible, setModalVisibility] = useState(false);
  const toggleModal = () => {
    setModalVisibility(!visible);
  };
  return (
    <Fragment onClick={toggleModal}>
      {!group ? (
        <Spinner />
      ) : (
        <div className={`${newRegistration ? '' : 'wrapper group-page'}`}>
          {' '}
          <Card style={{ marginBottom: 10 }} bordered={false}>
            <AutoCompleteGroupSearch />
          </Card>
          <div className='create-btn-wrapper'>
            <CreateGroupModal />
          </div>
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
                onChange: (page) => {
                  console.log(page);
                },
                total: group.searchResult.length,
                pageSize: 50,
                hideOnSinglePage: true,
              }}
              dataSource={group.searchResult}
              renderItem={(item) => (
                <Card key={`${item.id}-card`} hoverable={true} bordered={false}>
                  <GroupCard currentGroup={item} type='discover' />
                </Card>
              )}
            />
          ) : (
            <Empty
              description={
                group.searchTerm
                  ? 'No results found. Check the spelling or try again with another keyword.'
                  : 'No groups found in your city or school'
              }
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

DiscoverGroups.propTypes = {
  searchGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, {
  searchGroup,
  searchGroupWithFilters,
})(DiscoverGroups);
