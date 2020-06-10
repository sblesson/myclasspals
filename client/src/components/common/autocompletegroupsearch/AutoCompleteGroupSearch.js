import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';

import { searchGroupWithFilters } from '../../../actions/group';

const AutoCompleteGroupSearch = ({ searchGroupWithFilters, group }) => {
  const Option = Select.Option;

  const handleGroupSearch = searchTerm => {
    console.log(searchTerm);
    setTimeout(() => {
      searchGroupWithFilters({
        groupKeyword: searchTerm
      });
    }, Math.random() * 1000);
  };

  const children =
    group &&
    group.searchResult &&
    group.searchResult.length > 0 &&
    group.searchResult.map(item => {
      return (
        <Option key={item.id} value={item.groupName}>
          {item.groupName}
        </Option>
      );
    });

  return (
    <Select
      name='groupSelect'
      showArrow={false}
      showSearch={true}
      allowClear={true}
      style={{ width: '100%' }}
      placeholder='Type Group Name or School Name'
      onSearch={handleGroupSearch}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = state => ({
  group: state.group
});
export default connect(mapStateToProps, { searchGroupWithFilters })(
  AutoCompleteGroupSearch
);
