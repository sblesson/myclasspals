import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, message } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostModal from './modal/PostModal';
import LeftNav from '../leftnav/LeftNav';

import CreateGroupModal from '../groups/modal/CreateGroupModal';
import { searchPost } from '../../actions/post';
import { getGroupDetails } from '../../actions/group';
import PostFilters from '../common/filterpanel/FilterPanel';

import './Posts.scss';
const Posts = ({
  auth,
  post: { posts, categories, loading },
  getGroupDetails,
  group,
  searchPost,
  match,
  history
}) => {
  let loadedRowsMap = {};

  useEffect(() => {
    let user = null;
    let groupId = null;

    if (match && match.params && match.params.id) {
      groupId = match.params.id;
      //user clicked on another group from dashboard leftnav groups menu,
      //get groupId from params
      getGroupDetails(groupId);
      searchPost({ groupId: groupId });
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

  const { TabPane } = Tabs;

  const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    console.log(startIndex);
    console.log(stopIndex);
    console.log(loading);

    loading = true;
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      loadedRowsMap[i] = 1;
    }
    if (posts.length > 18) {
      message.warning('Virtualized List loaded all');
      loading = false;
      return;
    }
    console.log(group.currentGroup);
    console.log(posts[stopIndex]._id);
    console.log(loading);

    searchPost({
      groupId: group.currentGroup.id,
      lastseen: posts[startIndex]._id
      /* resultSize: 1 */
    });
  };

  const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

  const renderItem = ({ index, key, style }) => {
    const item = posts[index];
    return <PostItem key={index} post={item} />;
  };

  const vlist = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop,
    onRowsRendered,
    width
  }) => (
    <VList
      autoHeight
      height={height}
      isScrolling={isScrolling}
      onScroll={onChildScroll}
      overscanRowCount={5}
      rowCount={posts.length}
      rowHeight={73}
      rowRenderer={renderItem}
      onRowsRendered={onRowsRendered}
      scrollTop={scrollTop}
      width={width}
    />
  );
  const autoSize = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop,
    onRowsRendered
  }) => (
    <AutoSizer disableHeight>
      {({ width }) =>
        vlist({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered,
          width
        })
      }
    </AutoSizer>
  );
  const infiniteLoader = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop
  }) => (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={handleInfiniteOnLoad}
      rowCount={posts.length}
    >
      {({ onRowsRendered }) =>
        autoSize({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered
        })
      }
    </InfiniteLoader>
  );
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostFilters categories={categories} />
   
      <CreateGroupModal />

      <div className='feed-container'>
        {group && group.currentGroup && group.currentGroup.groupName ? (
          <div id='main' className='feed-wrapper'>
            <PostModal />
            {posts && posts.length > 0 && (
              <WindowScroller>{infiniteLoader}</WindowScroller>
            )}
          </div>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile/1' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  searchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  group: state.group
});

export default connect(mapStateToProps, {
  getGroupDetails,
  searchPost
})(Posts);
