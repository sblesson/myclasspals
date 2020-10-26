import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Select } from 'formik-antd';
import debounce from 'lodash.debounce';
import { searchUser } from '../../../actions/auth';

const MultiSelectUserSearch = ({ searchUser, auth, endUsersSelect }) => {
  const Option = Select.Option;

  const fetchUser = (searchTerm) => {
    if (searchTerm) {
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
      return (
        <Option key={index} value={item.email}>
          <span style={{ fontWeigth: 'bolder' }}> {item.email}</span>
        </Option>
      );
    });

  return (
    <Select
      name={endUsersSelect}
      placeholder='Select members'
      mode='multiple'
      onSearch={fetchUser}
      onChange={onUserSelect}
      showArrow={true}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { searchUser })(MultiSelectUserSearch);
