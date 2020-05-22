import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'formik-antd';
import { fetchSchool } from '../../../actions/school';

const AutoCompleteSchoolSearch = ({ fetchSchool, school }) => {
  const Option = Select.Option;

  const handleSchoolSearch = searchTerm => {
    if (searchTerm) {
      setTimeout(() => {
        fetchSchool(searchTerm);
      }, Math.random() * 1000);
    }
  };

  const children =
    school &&
    school.results &&
    school.results.length > 0 &&
    school.results.map((item, index) => {
      console.log(item);
      let selectedSchool =
        item.schoolName +
        ', ' +
        item.city +
        ', ' +
        item.state +
        ', ' +
        item.zip;
      return (
        <Option key={selectedSchool} value={selectedSchool}>
          <span style={{ fontWeigth: 'bolder' }}> {selectedSchool}</span>
        </Option>
      );
    });

  return (
    <Select
      name='schoolSelect'
      showSearch={true}
      placeholder='Select School'
      onSearch={handleSchoolSearch}
      allowClear={true}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = state => ({
  school: state.school
});
export default connect(mapStateToProps, { fetchSchool })(
  AutoCompleteSchoolSearch
);
