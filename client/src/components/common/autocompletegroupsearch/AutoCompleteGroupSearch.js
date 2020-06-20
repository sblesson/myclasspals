import React from 'react';
import { connect } from 'react-redux';
import { Input, AutoComplete } from 'antd';
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
  const handleGroupSearch = searchTerm => {
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

  const Complete = () => (
    <AutoComplete
      dropdownClassName='certain-category-search-dropdown'
      dropdownMatchSelectWidth={500}
      style={{
        width: 250
      }}
      options={group.searchResult}
    >
      <Input.Search size='large' placeholder='input here' />
    </AutoComplete>
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
