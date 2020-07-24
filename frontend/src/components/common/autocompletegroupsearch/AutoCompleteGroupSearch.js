import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Select, AutoComplete, Input } from 'antd';
import _ from 'lodash';
import Spinner from '../../../layout/Spinner';
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
  const [searchValue, setSearchValue] = useState('');

  const handleGroupSearch = searchTerm => {
    if (searchTerm) {
      var debounced = _.debounce(() => {
        getGroupAutoComplete(searchTerm, () => {
          setSearchValue(searchValue);
        });
      }, 100);
      //if (isCurrent.current) {
      debounced();
      //}
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
    }
  };

  const Complete = () => (
    <div>
      <div>
        <label className='auto-complete-label' title='Find your group'>
          {'Search your group'}
        </label>
      </div>
      <AutoComplete
        name='groupSearchTerm'
        style={{
          width: '100%'
        }}
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
    </div>
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
  getGroupAutoComplete
})(AutoCompleteGroupSearch);
