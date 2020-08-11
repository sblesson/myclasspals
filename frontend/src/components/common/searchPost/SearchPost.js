import React from 'react';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import _ from 'lodash';

import { searchPost } from '../../../actions/post';

const SearchPost = ({ searchPost, post, group }) => {
  const { Search } = Input;

  const fetchPost = searchTerm => {
    if (searchTerm) {
      let debounced = _.debounce(() => {
        searchPost({ keyword: searchTerm, groupId: group.currentGroup.id });
      }, Math.random() * 1000);
      debounced();
    }
  };

  const handleOnEnter = event => {
    if (event && event.currentTarget && event.currentTarget.defaultValue) {
      fetchPost(event.currentTarget.defaultValue);
    }
  };

  return (
    <Search
      placeholder={`Search posts from ${group.currentGroup.groupName}`}
      prefix={<SearchOutlined />}
      size='small'
      onPressEnter={handleOnEnter}
      onSearch={fetchPost}
      allowClear
    />
  );
};
const mapStateToProps = state => ({
  post: state.post,
  group: state.group
});
export default connect(mapStateToProps, { searchPost })(SearchPost);
