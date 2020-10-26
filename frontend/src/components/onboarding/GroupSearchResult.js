import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { List, Card, Empty } from 'antd';

import GroupCard from './GroupCard';

const GroupSearchResult = React.memo(({ group }) => {
  console.log('GroupSearchResult');

  return (
    <>
      {group !== null && group.searchResult && group.searchResult.length > 0 && (
        <List
          itemLayout='vertical'
          size='small'
          header={
            group.searchTerm ? `Groups based on your search` : 'Groups near you'
          }
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            total: group.searchResult.length,
            pageSize: 50,
            hideOnSinglePage: true,
          }}
          dataSource={group.searchResult}
          renderItem={(item) => (
            <GroupCard currentGroup={item} type='discover' />
          )}
        />
      )}
    </>
  );
});

GroupSearchResult.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupSearchResult;
