import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import { searchPost } from '../../actions/post';

import {
  InfiniteLoader,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller
} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

const Posts = ({ groupId, searchPost, post: { posts } }) => {
  const isCurrent = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const MAX_FEED_COUNT = 100;

  useEffect(() => {
    if (groupId) {
      if (isCurrent.current) {
        setIsLoading(true);

        searchPost(
          { groupId: groupId, startIndex: 0, endIndex: 3 },
          (response, cancel) => {
            setIsLoading(false);
            cancel = cancel();
          }
        );
      }
    }
  }, [searchPost, groupId]);

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    })
  );

  const isRowLoaded = index =>
    index < posts.length && posts[index] !== null && !isLoading && hasMorePosts;

  const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    setIsLoading(true);
    if (posts.length > MAX_FEED_COUNT) {
      setIsLoading(false);
      setHasMorePosts(false);
      return;
    }
    searchPost(
      {
        groupId: groupId,
        startIndex: startIndex,
        endIndex: stopIndex
      },
      (response, cancel) => {
        setIsLoading(false);
        cancel();
      }
    );
  };

  return (
    <div className='infinite-scroll-wrapper'>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={handleInfiniteOnLoad}
        rowCount={MAX_FEED_COUNT}
        threshold={10}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    autoHeight
                    scrollTop={scrollTop}
                    width={width}
                    height={height}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowHeight={cache.current.rowHeight}
                    deferredMeasurementCache={cache.current}
                    rowCount={posts.length}
                    rowRenderer={({ key, index, parent }) => {
                      const post = posts[index];
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                          width={width}
                        >
                          {({ measure }) => {
                            return (
                              <div onLoad={measure}>
                                {/*     {isLoading && hasMorePosts && (
                                  <div>
                                    <Spin />
                                  </div>
                                )} */}
                                {post ? (
                                  <PostItem
                                    style={{ marginBottom: '1rem' }}
                                    post={post}
                                  />
                                ) : (
                                  ''
                                )}
                              </div>
                            );
                          }}
                        </CellMeasurer>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  );
};

Posts.propTypes = {
  groupId: PropTypes.string.isRequired,
  searchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { searchPost })(Posts);
