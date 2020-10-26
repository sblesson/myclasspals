import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Select, AutoComplete, Input } from 'antd';
import _ from 'lodash';
import Spinner from '../spinner/Spinner';
import { SearchOutlined } from '@ant-design/icons';

import {
  getGroupAutoComplete,
  searchGroupWithFilters,
  clearAutoCompleteGroupSearchResult,
  clearGroupSearchResult,
} from '../../../actions/group';
import './AutoCompleteGroupSearch.scss';

const AutoCompleteGroupSearch = ({
  getGroupAutoComplete,
  clearAutoCompleteGroupSearchResult,
  searchGroupWithFilters,
  group,
}) => {
  const { Option, OptGroup } = Select;

  useEffect(() => {
    return () => {
      clearAutoCompleteGroupSearchResult();
      clearGroupSearchResult();
    };
  }, []);

  const children =
    group &&
    group.autoCompleteSearchResult &&
    group.autoCompleteSearchResult.length > 0 &&
    group.autoCompleteSearchResult.map((item) => {
      return (
        <OptGroup label={item.label} key={item.label}>
          {item.options &&
            item.options.length > 0 &&
            item.options.map((dataOption) => {
              if (dataOption) {
                return (
                  <Option key={dataOption} value={dataOption}>
                    <div>
                      {' '}
                      <SearchOutlined
                        twoToneColor='#52c41a'
                        style={{ fontSize: '.8rem' }}
                      />
                      <span
                        style={{
                          marginLeft: '.5rem',
                          paddingTop: '.3rem',
                          fontSize: '.8rem',
                          display: 'inline-block',
                        }}
                      >
                        {dataOption}
                      </span>
                    </div>
                  </Option>
                );
              }
            })}
        </OptGroup>
      );
    });

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      getGroupAutoComplete(searchTerm);
    }
  };

  const onGroupSelect = (selectedSearchTerm) => {
    if (selectedSearchTerm) {
      let selectedSearch = selectedSearchTerm.split(',')[0];
      searchGroupWithFilters({
        groupKeyword: selectedSearch,
        schoolName: selectedSearch,
      });
    }
  };

  return (
    <AutoComplete
      //dropdownMatchSelectWidth={252}
      style={{
        width: '100%',
      }}
      onSelect={onGroupSelect}
      onSearch={handleSearch}
      allowClear={true}
    >
      {children ? (
        children
      ) : (
        <Input.Search
          size='large'
          placeholder='Type school name or group name'
        />
      )}
    </AutoComplete>
  );
};
const mapStateToProps = (state) => ({
  group: state.group,
});
export default connect(mapStateToProps, {
  searchGroupWithFilters,
  getGroupAutoComplete,
  clearAutoCompleteGroupSearchResult,
})(AutoCompleteGroupSearch);
