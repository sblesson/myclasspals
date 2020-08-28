import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Select, AutoComplete, Input } from 'antd';
import _ from 'lodash';
import Spinner from '../spinner/Spinner';
import { SearchOutlined } from '@ant-design/icons';
import { Form, FormItem } from 'formik-antd';
import {
  getGroupAutoComplete,
  searchGroupWithFilters
} from '../../../actions/group';
import './AutoCompleteGroupSearch.scss';

const AutoCompleteGroupSearch = ({
  getGroupAutoComplete,
  searchGroupWithFilters,
  group
}) => {
  const { Option, OptGroup } = Select;

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

  const handleSearch = searchTerm => {
    if (searchTerm) {
      getGroupAutoComplete(searchTerm);
    }
  };

  const onSelect = value => {
    console.log('onSelect', value);
  };

  return (
    <AutoComplete
      //dropdownMatchSelectWidth={252}
      style={{
        width: '100%'
      }}
      placeholder={'Type school name or group name'}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      {children}
    </AutoComplete>
  );
};
const mapStateToProps = state => ({
  group: state.group
});
export default connect(mapStateToProps, {
  searchGroupWithFilters,
  getGroupAutoComplete
})(AutoCompleteGroupSearch);
