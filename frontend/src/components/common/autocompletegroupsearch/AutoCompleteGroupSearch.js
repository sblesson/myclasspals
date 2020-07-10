import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Select, AutoComplete, Input } from 'antd';
import _ from 'lodash';
import Spinner from '../../../layout/Spinner';
import { SearchOutlined } from '@ant-design/icons';
import {
  getGroupAutoComplete,
  clearAutoCompleteGroupSearchResult,
  searchGroupWithFilters
} from '../../../actions/group';

const AutoCompleteGroupSearch = ({
  getGroupAutoComplete,
  clearAutoCompleteGroupSearchResult,
  searchGroupWithFilters,
  group
}) => {
  const { Option, OptGroup } = Select;
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    clearAutoCompleteGroupSearchResult();
  }, []);

  const handleGroupSearch = searchTerm => {
    if (searchTerm) {
      var debounced = _.debounce(() => {
        getGroupAutoComplete(searchTerm, () => {
          setSearchValue(searchValue);
        });
      }, 100);
      debounced();
    }
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
                          display: 'inline-block'
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

  const onGroupChange = (value, action) => {
    if (
      group &&
      group.autoCompleteSearchResult &&
      group.autoCompleteSearchResult.length > 0
    ) {
      setSearchValue(value);
      group.searchTerm = value;
    }
  };
  const onGroupSelect = selectedSearchTerm => {
    if (selectedSearchTerm) {
      let selectedSearch = selectedSearchTerm.split(',')[0];
      searchGroupWithFilters({ groupKeyword: selectedSearch });
      clearAutoCompleteGroupSearchResult();
    }
  };

  const Complete = () => (
    <AutoComplete
      name='groupSearchTerm'
      style={{
        width: '80%'
      }}
      autoFocus={true}
      value={searchValue}
      placeholder={'Type school name or group name'}
      onSearch={handleGroupSearch}
      onChange={onGroupChange}
      onSelect={onGroupSelect}
      notFoundContent={group.loading ? <Spin size='small' /> : null}
      defaultOpen={true}
    >
      {children}
    </AutoComplete>
  );

  return (
    <Fragment> {group && group.loading ? <Spinner /> : <Complete />}</Fragment>
  );
};
const mapStateToProps = state => ({
  group: state.group
});
export default connect(mapStateToProps, {
  searchGroupWithFilters,
  getGroupAutoComplete,
  clearAutoCompleteGroupSearchResult
})(AutoCompleteGroupSearch);
