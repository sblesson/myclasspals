import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Select } from 'antd';
import _ from 'lodash';

import {
  searchUser,
  clearAutoCompleteUserSearchResult,
} from '../../../actions/auth';

const AutoCompleteUserSearch = ({
  searchUser,
  clearAutoCompleteUserSearchResult,
  auth,
}) => {
  const Option = Select.Option;

  useEffect(() => {
    //clearAutoCompleteUserSearchResult();
  }, []);
  const handleUserSearch = (searchTerm) => {
    console.log(searchTerm);
    if (searchTerm) {
      var debounced = _.debounce(() => {
        searchUser(searchTerm);
      }, 1000);
      debounced();
    }
  };

  const children =
    auth &&
    auth.searchUserResult &&
    auth.searchUserResult.length > 0 &&
    auth.searchUserResult.map((item, index) => {
      return (
        <Option key={index} value={item.email}>
          <span style={{ fontWeigth: 'bolder' }}> {item.email}</span>
        </Option>
      );
    });

  return (
    /*     <Select
      mode='multiple'
      size='default'
      name='endUserId'
      //showSearch={true}
      placeholder='Type Name'
      onChange={handleUserSearch}
      //allowClear={true}
    >
      {children}
    </Select> */

    <AutoComplete
      //dropdownMatchSelectWidth={252}
      style={{
        width: '100%',
      }}
      placeholder={'Type Name'}
      //onSelect={onGroupSelect}
      onSearch={handleUserSearch}
    >
      {children}
    </AutoComplete>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  searchUser,
  clearAutoCompleteUserSearchResult,
})(AutoCompleteUserSearch);
