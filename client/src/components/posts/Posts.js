import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, Input } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostModal from './modal/PostModal';
import LeftNav from '../leftnav/LeftNav';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { StickyContainer, Sticky } from 'react-sticky';
import CreateGroupModal from '../groups/modal/CreateGroupModal';
import { getPosts, getPostCategories, searchPost } from '../../actions/post';
import { getGroupDetails } from '../../actions/group';
import PostFilters from '../common/filterpanel/FilterPanel';

import './Posts.scss';
const Posts = ({
  auth,
  getPosts,
  getPostCategories,
  post: { posts, categories, loading },
  getGroupDetails,
  group,
  searchPost,
  match
}) => {
  useEffect(() => {
    let user = null;
    let groupId = null;

    if (match && match.params && match.params.id) {
      groupId = match.params.id;
    } else {
      //first time groupId is not passed in url param.
      //So get groupId from user group first item
      try {
        user = JSON.parse(auth.user);
      } catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the auth.user
        // So just return that
        user = auth.user;
      }
      groupId = user.userGroup[0].id;
    }
    getGroupDetails(groupId);
    searchPost({ groupId: groupId });
    getPostCategories();
  }, [getGroupDetails, searchPost, auth.user, match]);

  /*   useEffect(() => {
    const groupId = match.param.id;
    getGroupDetails(groupId);
    searchPost({ groupId: groupId });
    getPostCategories();
  }, [
    getGroupDetails,
    searchPost,
    match && match.param && match.param.id ? match.param.id : null
  ]); */

  const { Search } = Input;

  const { TabPane } = Tabs;

  const [items, setItems] = useState({});
  const [requestCache, setRequestCache] = useState({});

  const getPostUrl = (rows, start) => `/api/posts?&rows=${rows}&start=${start}`;

  const Row = ({ index, style }) => {
    const item = posts[index];
    console.log(item);
    if (item) {
      return <PostItem key={item._id} post={item} />;
    }
    return null;
  };

  const isItemLoaded = ({ index }) => !!items[index];

  const loadMoreItems = (visibleStartIndex, visibleStopIndex) => {
    const key = [visibleStartIndex, visibleStopIndex].join(':'); // 0:10
    if (requestCache[key]) {
      return;
    }

    const numVisibleRows = visibleStopIndex - visibleStartIndex;
    const visibleRange = [...Array(numVisibleRows).keys()].map(
      x => x + visibleStartIndex
    );
    const itemsRetrieved = visibleRange.every(index => !!items[index]);

    if (itemsRetrieved) {
      requestCache[key] = key;
      return;
    }

    return axios
      .get(getPostUrl(numVisibleRows, visibleStartIndex))
      .then(response => {
        response.data.forEach((post, index) => {
          //setItems(index + visibleStartIndex, post);
          items[index + visibleStartIndex] = post;
        });
      })
      .catch(error => console.error('Error:', error));
  };

  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar
          {...props}
          className='site-custom-tab-bar'
          style={{ ...style }}
        />
      )}
    </Sticky>
  );
  //if you use search in future, keep it
  const operations = (
    <Search
      placeholder='Seach post'
      onSearch={value =>
        searchPost({ groupId: group.currentGroup.id, keyword: value })
      }
      style={{ width: 300, top: '0px' }}
      enterButton
    />
  );

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '16px'
  };

  const state = {
    value: 1
  };

  const onGroupChange = e => {
    console.log('radio checked', e.target.value);

    state.value = e.target.value;
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='row'>
        <div className='col-xs-1 col-sm-3 col-md-3 col-lg-3'>
          <LeftNav />
        </div>
        <div className='col-xs-6 col-sm-6 col-md-8 col-lg-6'>
          <PostFilters categories={categories} />
          <div style={{ marginTop: '20px' }}>
            <img
              src='https://d19rpgkrjeba2z.cloudfront.net/static/images/groups/default-cover4@2x.svg'
              alt='Custom banner image for this neighborhood group.'
              data-testid='groups-page-header-image'
            ></img>
          </div>
          <div className='feed-container'>
            <Tabs defaultActiveKey='1' /* tabBarExtraContent={operations} */>
              {group && group.currentGroup && group.currentGroup.groupName ? (
                <TabPane tab={group.currentGroup.groupName} key='1'>
                  <div id='main' className='feed-wrapper'>
                    <PostModal />
                    {posts && posts.length > 0
                      ? posts.map(item => (
                          <PostItem key={item._id} post={item} />
                        ))
                      : 'There are currently no post for this group.'}

                    {/*                     <AutoSizer>
                      {({ height, width }) => (
                        <InfiniteLoader
                          isItemLoaded={isItemLoaded}
                          loadMoreItems={loadMoreItems}
                          itemCount={1000}
                        >
                          {({ onItemsRendered, ref }) => (
                            <FixedSizeList
                              className='List'
                              height={height}
                              itemCount={1000}
                              itemSize={35}
                              width={width}
                              ref={ref}
                              onItemsRendered={onItemsRendered}
                            >
                              {Row}
                            </FixedSizeList>
                          )}
                        </InfiniteLoader>
                      )}
                    </AutoSizer> */}
                  </div>
                </TabPane>
              ) : (
                ''
              )}
            </Tabs>
          </div>
        </div>
        <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2'>
          <CreateGroupModal />
          {/* 
          <Card
            style={{ marginTop: 6, background: 'rgb(243, 250, 253)' }}
            type='inner'
            title='Groups'
          >
            {userGroup && userGroup.length > 0 ? (
              <Radio.Group name='selectedUserGroup' onChange={onGroupChange}>
                {userGroup.map(group => (
                  <Radio key={group.id} style={radioStyle} value={group.id}>
                    <Link to={`/group/${group.id}`}>{group.groupName}</Link>
                  </Radio>
                ))}
              </Radio.Group>
            ) : (
              'No Groups Found'
            )}
          </Card> */}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  group: state.group
});

export default connect(mapStateToProps, {
  getPosts,
  getPostCategories,
  getGroupDetails,
  searchPost
})(Posts);
