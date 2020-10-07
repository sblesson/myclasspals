import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Spin, List } from 'antd';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';

import './Posts.scss';

const Posts = ({ post: { posts, totalPostCount, loading } }) => {
  const MAX_FEED_COUNT = totalPostCount;

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
          <List.Item key={index} className='feed-list-item'>
            <PostItem post={item} />
          </List.Item>
          
        )}
      />
    </div>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {})(Posts);
