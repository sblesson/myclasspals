import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Card, Empty, Modal, Button } from 'antd';
import AutoCompleteGroupSearch from '../../common/autocompletegroupsearch/AutoCompleteGroupSearch';
import { searchGroup, searchGroupWithFilters } from '../../../actions/group';
import { SearchOutlined } from '@ant-design/icons';

import GroupCard from '../GroupCard';

import './DiscoverGroupModal.scss';

const DiscoverGroupModal = ({ group, newRegistration }) => {
  const [visible, setModalVisibility] = useState(true);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = () => {
    setModalVisibility(!visible);
  };
  return (
    <Fragment>
      <div onClick={toggleModal}>
        <Button className='discover-group' icon={<SearchOutlined />}>
          Search Group
        </Button>
      </div>

      <Modal
        className='create-group-modal'
        title={'Discover Group'}
        centered
        closable={true}
        visible={visible}
        onOk={hideModal}
        okText='Create'
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
      </Modal>
    </Fragment>
  );
};

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
