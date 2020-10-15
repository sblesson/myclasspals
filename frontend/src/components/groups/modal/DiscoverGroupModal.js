import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Card, Empty, Modal, Button } from 'antd';
import AutoCompleteGroupSearch from '../../common/autocompletegroupsearch/AutoCompleteGroupSearch';
import { searchGroup, searchGroupWithFilters } from '../../../actions/group';
import { SearchOutlined } from '@ant-design/icons';

import GroupSearchResult from './GroupSearchResult';

import './DiscoverGroupModal.scss';

const DiscoverGroupModal = React.memo(({ group }) => {
  console.log('inside DiscoverGroupModal');
  const [isModalVisible, setModalVisibility] = useState(false);

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = (event) => {
    console.log(event);
    event.preventDefault();
    setModalVisibility(!isModalVisible);
  };
  return (
    <>
      <div onClick={(event) => toggleModal(event)}>
        <div
          className='search-box'
        >
          <SearchOutlined className='search-box__icon' />
          <span className='search-box__input'> Search Groups</span>
        </div>
      </div>

      <Modal
        className='discover-group-modal'
        title={'Discover Group'}
        centered
        visible={isModalVisible}
        onOk={hideModal}
        onCancel={toggleModal}
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
        footer={null}
      >
        <Card style={{ marginBottom: 10 }} bordered={false}>
          <AutoCompleteGroupSearch />
        </Card>
        {group !== null &&
        group.searchResult &&
        group.searchResult.length > 0 ? (
          <GroupSearchResult group={group} />
        ) : (
          <Empty
            description={
              group.searchTerm
                ? 'No results found. Check the spelling or try again with another keyword.'
                : 'No groups found in your city or school'
            }
          />
        )}
      </Modal>
    </>
  );
});

DiscoverGroupModal.propTypes = {
  searchGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, {
  searchGroup,
  searchGroupWithFilters,
})(DiscoverGroupModal);
