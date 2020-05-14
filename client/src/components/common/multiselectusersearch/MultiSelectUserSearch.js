import React from 'react';
import { connect } from 'react-redux';
import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import { searchUser } from '../../../actions/auth';

const MultiSelectUserSearch = ({ searchUser, auth }) => {
  const Option = Select.Option;

  const fetchUser = searchTerm => {
    if (searchTerm) {
      //debounce(searchUser(searchTerm), 800);
      setTimeout(() => {
        searchUser(searchTerm);
      }, Math.random() * 1000);
    }
  };

  const onUserSelect = (value, option) => {
    if (auth && auth.searchUserResult && auth.searchUserResult.length > 0) {
      //update selected school in the reducer
      auth.selectedUser = auth.searchUserResult[option.key];
    }
  };

  const children =
    auth &&
    auth.searchUserResult &&
    auth.searchUserResult.length > 0 &&
    auth.searchUserResult.map((item, index) => {
      console.log(item);
      let selectedUser = item.email;
      return (
        <Option key={index} value={selectedUser}>
          <span style={{ fontWeigth: 'bolder' }}> {item.email}</span>
        </Option>
      );
    });

  return (
    <Select
      mode='multiple'
      labelInValue
      //value={value}
      placeholder='Type users'
      //notFoundContent={auth.loading ? <Spin size='small' /> : null}
      filterOption={false}
      onSearch={fetchUser}
      onChange={onUserSelect}
      style={{ width: '100%' }}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { searchUser })(MultiSelectUserSearch);
