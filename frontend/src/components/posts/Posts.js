import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Spin, List } from 'antd';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import { searchPost } from '../../actions/post';
import VList from 'react-virtualized/dist/commonjs/List';

import {
  InfiniteLoader,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

const Posts = ({
  groupId,
  searchPost,
  post: { posts, totalPostCount, loading },
}) => {
  const MAX_FEED_COUNT = totalPostCount;
  useEffect(() => {
    searchPost(
      {
        groupId: groupId,
      },
      (cancel) => {
        cancel();
      }
    );
  }, []);

  return (
    <div>
      {loading && <Spin />}

      <List
        size='small'
        dataSource={posts}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          total: MAX_FEED_COUNT,
          pageSize: 50,
          hideOnSinglePage: true,
        }}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <PostItem post={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

Posts.propTypes = {
  groupId: PropTypes.string.isRequired,
  searchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { searchPost })(Posts);
