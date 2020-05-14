import React from 'react';
import { connect } from 'react-redux';
import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import { getSchoolData } from '../../../actions/school';

const MultiSelectSchoolSearch = ({ getSchoolData, school }) => {
  const Option = Select.Option;

  const fetchSchool = searchTerm => {
    if (searchTerm) {
      //debounce(searchUser(searchTerm), 800);
      setTimeout(() => {
        getSchoolData(searchTerm);
      }, Math.random() * 1000);
    }
  };

  const onSchoolSelect = (value, option) => {
    if (school && school.results && school.results.length > 0) {
      //update selected school in the reducer
      school.selectedSchool = school.results[option.key];
    }
  };

  const children =
    school &&
    school.results &&
    school.results.length > 0 &&
    school.results.map((item, index) => {
      console.log(item);
      let selectedSchool = item.schoolName + ', ' + item.state;
      return (
        <Option key={index} value={selectedSchool}>
          <span style={{ fontWeigth: 'bolder' }}>
            {' '}
            {item.schoolName}, {item.state}
          </span>
        </Option>
      );
    });

  return (
    <Select
      mode='multiple'
      labelInValue
      //value={value}
      placeholder='Type schools ..'
      //notFoundContent={auth.loading ? <Spin size='small' /> : null}
      filterOption={false}
      onSearch={fetchSchool}
      onChange={onSchoolSelect}
      style={{ width: '100%' }}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = state => ({
  school: state.school
});
export default connect(mapStateToProps, { getSchoolData })(
  MultiSelectSchoolSearch
);
