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

  const children =
    group &&
    group.autoCompleteSearchResult &&
    group.autoCompleteSearchResult.length > 0 &&
    group.autoCompleteSearchResult.map(item => {
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
    const selectedSearchTerm = value.split(',')[0];
    searchGroupWithFilters({ groupKeyword: selectedSearchTerm });
    group.autoCompleteSearchResult = [];
  };

  const Complete = () => (
    <Select
      style={{
        width: 250
      }}
      onSearch={handleGroupSearch}
      onSelect={onGroupSelect}
      notFoundContent={''}
      showSearch={true}
      defaultOpen={true}
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
