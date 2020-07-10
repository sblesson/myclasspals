import React from 'react';
import { connect } from 'react-redux';
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

  return (
    <Search
      placeholder={`Search posts in ${group.currentGroup.groupName}`}
      size='large'
      onPressEnter={fetchPost}
      onSearch={fetchPost}
    />
  );
};
const mapStateToProps = state => ({
  post: state.post,
  group: state.group
});
export default connect(mapStateToProps, { searchPost })(SearchPost);
