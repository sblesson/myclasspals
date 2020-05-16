import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Select } from 'formik-antd';
import debounce from 'lodash.debounce';
import { fetchSchool } from '../../../actions/school';

const MultiSelectSchoolSearch = ({ fetchSchool, school }) => {
  const Option = Select.Option;

  const onSearchSchool = searchTerm => {
    if (searchTerm) {
      //debounce(searchUser(searchTerm), 800);
      setTimeout(() => {
        school.isLoading = true;
        fetchSchool(searchTerm);
      }, Math.random() * 1000);
    }
  };

  const onSchoolChange = (value, option) => {
    console.log(value);
    /* if (school && school.results && school.results.length > 0) {
      //update selected school in the reducer
      school.selectedSchools.push(option);
    } */
  };

  const children =
    school &&
    school.results &&
    school.results.length > 0 &&
    school.results.map((item, index) => {
      return (
        <Option key={index} value={item.schoolid}>
          <span style={{ fontWeigth: 'bolder' }}>
            {' '}
            {item.schoolName}, {item.city} {item.state}
          </span>
        </Option>
      );
    });

  return (
    <Select
      name='schoolId'
      placeholder='Select schools'
      mode='multiple'
      onSearch={onSearchSchool}
      onChange={onSchoolChange}
      notFoundContent={school.isLoading ? <Spin size='small' /> : null}
      filterOption={false}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = state => ({
  school: state.school
});
export default connect(mapStateToProps, { fetchSchool })(
  MultiSelectSchoolSearch
);
