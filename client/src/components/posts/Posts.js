import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostModal from './modal/PostModal';
import { getPosts, getPostCategories } from '../../actions/post';
import LeftNav from '../leftnav/LeftNav';
import { Card } from 'antd';
import { Radio } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import PrivateMessageModal from '../groups/modal/CreateGroupModal';

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

  const operations = <PrivateMessageModal />;

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
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <LeftNav />
        </div>
        <div className='col-xs-6 col-sm-6 col-md-8 col-lg-6'>
          <div className='feed-container'>
            <Tabs defaultActiveKey='1' tabBarExtraContent={operations}>
              <TabPane tab='My Groups' key='1'>
                <div id='main' className='feed-wrapper'>
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
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <Card style={{ marginTop: 6 }} type='inner' title='My Groups'>
            <Radio.Group onChange={onGroupChange} value={state.value}>
              <Radio style={radioStyle} value={1}>
                <Ellipsis length={10}>warmsprings grade 6</Ellipsis>
              </Radio>
              <Radio style={radioStyle} value={2}>
                <Ellipsis length={10}>sunshine</Ellipsis>
              </Radio>
              <Radio style={radioStyle} value={3}>
                <Ellipsis length={10}>
                  upcoming 7th gradersupcoming 7th gradersupcoming 7th
                  gradersupcoming 7th gradersupcoming 7th gradersupcoming 7th
                  gradersupcoming 7th gradersupcoming 7th graders
                </Ellipsis>
              </Radio>
            </Radio.Group>{' '}
          </Card>
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
