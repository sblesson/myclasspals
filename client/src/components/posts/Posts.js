import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  match,
  history
}) => {
  useEffect(() => {
    let user = null;
    let groupId = null;

    if (match && match.params && match.params.id) {
      groupId = match.params.id;
      //user clicked on another group from dashboard leftnav groups menu,
      //get groupId from params
      getGroupDetails(groupId);
      searchPost({ groupId: groupId });
      getPostCategories();
    } else if (auth.user) {
      try {
        user = JSON.parse(auth.user);
      } catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the auth.user so just return that
        user = auth.user;
      }
      if (user && user.userGroup && user.userGroup.length > 0) {
        //first time groupId is not passed in url param.
        //So get groupId from user group first item
        groupId = user.userGroup[0].id;
        getGroupDetails(groupId);
        searchPost({ groupId: groupId });
        getPostCategories();
      } else if (
        user &&
        user.pendingInvitedUserGroups &&
        user.pendingInvitedUserGroups.length > 0
      ) {
        //New user who got invitation from another group, redirect to groups page
        group.currentGroup = user.pendingInvitedUserGroups[0];
        groupId = user.pendingInvitedUserGroups[0].id;

        history.push(`/group/${groupId}`);
      } else {
        //New user login for first time, not part of any groups, redirect to create profile and help user discover group
        history.push(`/create-profile/1`);
      }
    }
  }, [getGroupDetails, searchPost, auth.user, match]);

  const { Search } = Input;

  const { TabPane } = Tabs;

  const [items, setItems] = useState({});
  const [requestCache, setRequestCache] = useState({});

  const getPostUrl = (rows, start) => `/api/posts?&rows=${rows}&start=${start}`;

  const Row = ({ index, style }) => {
    const item = posts[index];
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

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='row'>
        <div className='col-xs-1 col-sm-3 col-md-3 col-lg-3'>
          <LeftNav screen='dashboard' />
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
            {group && group.currentGroup && group.currentGroup.groupName ? (
              <Tabs defaultActiveKey='1' /* tabBarExtraContent={operations} */>
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
              </Tabs>
            ) : (
              <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile/1' className='btn btn-primary my-1'>
                  Create Profile
                </Link>
              </Fragment>
            )}
          </div>
        </div>
        <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2'>
          <CreateGroupModal />
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
