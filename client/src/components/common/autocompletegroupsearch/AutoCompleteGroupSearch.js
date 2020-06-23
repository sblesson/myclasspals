import React from 'react';
import { connect } from 'react-redux';
import { Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import _ from 'lodash';
import {
  getGroupAutoComplete,
  searchGroupWithFilters
} from '../../../actions/group';

const AutoCompleteGroupSearch = ({
  getGroupAutoComplete,
  searchGroupWithFilters,
  group
}) => {
  const Option = Select.Option;

  const handleGroupSearch = searchTerm => {
    debugger;
    console.log(searchTerm);
    _.debounce(() => {
      getGroupAutoComplete({
        groupKeyword: searchTerm
      });
    }, Math.random() * 1000);
  };

  /*   const children =
    group &&
    group.searchResult &&
    group.searchResult.length > 0 &&
    group.searchResult.map(item => {
      return (
        <Option key={item.id} value={item.groupName}>
          {item.groupName}
        </Option>
      );
    }); */

  const renderTitle = title => <span>{title}</span>;

  const options = [
    {
      label: renderTitle('Schools'),
      options: group.searchResult.schools
    },
    {
      label: renderTitle('Group Name'),
      options: group.searchResult.userGroups
    }
  ];

  const onGroupSelect = (value, option) => {
    console.log(value);
    console.log(option);
    if (group && group.searchResult && group.searchResult.length > 0) {
      //update selected address in the reducer
      //group.searchResult = group.searchResult[option.key];

      console.log(group.searchResult[option.key]);
    }
  };

  const children =
    group &&
    group.searchResult &&
    group.searchResult.length > 0 &&
    group.searchResult.map((item, index) => {
      let selectedGroup = JSON.stringify(item);

      return (
        <Option key={index} value={selectedGroup}>
          {item.name}
        </Option>
      );
    });

  const Complete = () => (
    <Select
      dropdownClassName='certain-category-search-dropdown'
      dropdownMatchSelectWidth={500}
      style={{
        width: 250
      }}
      options={group.searchResult}
      onSearch={handleGroupSearch}
      onChange={onGroupSelect}
    >
      {children}
    </Select>
  );

  return <Complete />;
};
const mapStateToProps = state => ({
  group: state.group
});
export default connect(mapStateToProps, {
  searchGroupWithFilters,
  getGroupAutoComplete
})(AutoCompleteGroupSearch);
