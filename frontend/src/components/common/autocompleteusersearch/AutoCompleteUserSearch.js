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
  onChangeUserSelect,
}) => {
  console.log('inside Message AutoCompleteUserSearch');

  const { Option } = Select;

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

  const onUserSelect = (selectedSearchTerm) => {
    if (selectedSearchTerm) {
      console.log(selectedSearchTerm);

      onChangeUserSelect(selectedSearchTerm);
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
    <AutoComplete
      //dropdownMatchSelectWidth={252}
      style={{
        width: '100%',
      }}
      placeholder={'Type Name'}
      onSelect={onUserSelect}
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
