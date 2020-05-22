import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'formik-antd';

import { searchGroupWithFilters } from '../../../actions/group';

const AutoCompleteGroupSearch = ({ searchGroupWithFilters, group }) => {
  const Option = Select.Option;

  const handleGroupSearch = searchTerm => {
    setTimeout(() => {
      searchGroupWithFilters({
        groupKeyword: searchTerm
      });
    }, Math.random() * 1000);
  };

  const onGroupNameChange = (value, option) => {
    console.log(value);
    console.log(option);
    /*   if (group && group.searchResult && group.searchResult.length > 0) {
      //update selected address in the reducer
      group.searchResult = group.searchResult[option.key];
    } */
  };

  const children =
    group &&
    group.searchResult &&
    group.searchResult.length > 0 &&
    group.searchResult.map((item, index) => {
      console.log(item.id);
      return (
        <Option key={item.id} value={item.groupName}>
          {item.groupName}
        </Option>
      );
    });

  return (
    <Select
      name='groupSelect'
      showSearch
      placeholder='Type Group Name or School Name'
      onSearch={handleGroupSearch}
      onChange={onGroupNameChange}
    >
      {children}{' '}
    </Select>
  );
};
const mapStateToProps = state => ({
  group: state.group
});
export default connect(mapStateToProps, { searchGroupWithFilters })(
  AutoCompleteGroupSearch
);
