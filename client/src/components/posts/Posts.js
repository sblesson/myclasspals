import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostModal from './modal/PostModal';
import { getPosts, getPostCategories } from '../../actions/post';
import LeftNav from '../leftnav/LeftNav';

import { Menu, Segment, Button, Image } from 'semantic-ui-react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';

import './Posts.scss';
const Posts = ({ getPosts, getPostCategories, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
    getPostCategories();
  }, [getPosts]);
  const { TabPane } = Tabs;

  const [items, setItems] = useState({});
  const [activeItem, setActiveItem] = useState('catherine');

  const [requestCache, setRequestCache] = useState({});

  const getPostUrl = (rows, start) => `/api/posts?&rows=${rows}&start=${start}`;

  const Row = ({ index, style }) => {
    const item = items[index];
    if (item) {
      return <PostItem key={item._id} post={item} />;
    }
    return null;
  };

  const isItemLoaded = ({ index }) => !!items[index];

  const handleItemClick = (e, { name }) => setActiveItem(name);

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

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='row'>
        <LeftNav />

        <div className='post-container has-sidbar'>
          <Menu pointing secondary>
            <Menu.Item
              name='catherine'
              active={activeItem === 'catherine'}
              onClick={handleItemClick}
            />
          </Menu>

          <Segment>
            <div className='row'>
              <div id='main' className='col-md-12'>
                <article>
                  <PostModal />
                  <AutoSizer>
                    {({ height, width }) => (
                      <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        loadMoreItems={loadMoreItems}
                        itemCount={1000}
                      >
                        {({ onItemsRendered, ref }) => (
                          <List
                            className='List'
                            height={height}
                            itemCount={1000}
                            itemSize={35}
                            width={width}
                            ref={ref}
                            onItemsRendered={onItemsRendered}
                          >
                            {Row}
                          </List>
                        )}
                      </InfiniteLoader>
                    )}
                  </AutoSizer>

                  {/*   <List>
              {posts.map(post => (
                <PostItem key={post._id} post={post} />
              ))}
            </List> */}
                </article>
              </div>
            </div>
          </Segment>
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
  post: state.post
});

export default connect(mapStateToProps, { getPosts, getPostCategories })(Posts);
