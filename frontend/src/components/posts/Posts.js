import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import PostItem from '../posts/PostItem';
import { searchPost } from '../../actions/post';

import {
  InfiniteLoader,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';

const Posts = ({ groupId, post: { posts, loading }, searchPost }) => {
  debugger;
  console.log('inside posts' + groupId);
  const isCurrent = useRef(true);

  useEffect(() => {
    if (groupId) {
      if (isCurrent.current) {
        searchPost({ groupId: groupId });
      }
    }
  }, [searchPost, groupId]);

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    })
  );

  const isRowLoaded = ({ index }) => {
    return !!posts[index];
  };

  const loadMoreRows = ({ startIndex, stopIndex }) => {
    console.log(startIndex);
    console.log(stopIndex);

    /*    return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
      .then(response => {
        // Store response data in list...
      }) */
    searchPost({ groupId: groupId });
  };

  return (
    <Fragment>
      {posts.loading ? (
        <Spinner />
      ) : (
        <div style={{ width: '100%', height: '100vh' }}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={100}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowHeight={cache.current.rowHeight}
                    deferredMeasurementCache={cache.current}
                    rowCount={posts.length}
                    rowRenderer={({ key, index, style, parent }) => {
                      const post = posts[index];
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                        >
                          <div style={style}>
                            <PostItem post={post} />
                          </div>
                        </CellMeasurer>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </div>
      )}
    </Fragment>
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
