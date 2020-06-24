import React from 'react';
import { connect } from 'react-redux';
import { Input, AutoComplete, Select } from 'antd';
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
  const { Option, OptGroup } = Select;

  const handleGroupSearch = searchTerm => {
    setTimeout(() => {
      getGroupAutoComplete(searchTerm);
    }, Math.random() * 1000);
  };

  const renderTitle = title => <span>{title}</span>;

  const renderItem = title => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {title}
      </div>
    )
  });

  const children =
    group &&
    group.searchResult &&
    group.searchResult.length > 0 &&
    group.searchResult.map(item => {
      return (
        <OptGroup label={item.label} key={item.label}>
          {item.options &&
            item.options.length > 0 &&
            item.options.map(dataOption => {
              return (
                <Option key={dataOption} value={dataOption}>
                  {dataOption}
                </Option>
              );
            })}
        </OptGroup>
      );
    });

  const onGroupSelect = (value, option) => {
    console.log(value);
    console.log(option);
    if (group && group.searchResult && group.searchResult.length > 0) {
      //update selected address in the reducer
      //group.searchResult = group.searchResult[option.key];

      console.log(group.searchResult[option.key]);
    }
  };

  const Complete = () => (
    <Select
      dropdownClassName='certain-category-search-dropdown'
      dropdownMatchSelectWidth={500}
      style={{
        width: 250
      }}
      onSearch={handleGroupSearch}
      onChange={onGroupSelect}
      notFoundContent={''}
      /*      allowClear={true}
       */
      showSearch={true}
      defaultOpen={true}
    >
      {children}
    </Select>
    /*
    <AutoComplete
      //dropdownMatchSelectWidth={252}
      style={{
        width: 300
      }}
      onSelect={onGroupSelect}
      onSearch={handleGroupSearch}
    >
      {children}
    </AutoComplete> */
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
