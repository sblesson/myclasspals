import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Select } from 'formik-antd';
import _ from 'lodash';

import {
  fetchSchool,
  clearAutoCompleteSchoolSearchResult,
} from '../../../actions/school';

const AutoCompleteSchoolSearch = ({ fetchSchool, school }) => {
  const Option = Select.Option;

  useEffect(() => {
    clearAutoCompleteSchoolSearchResult();
  }, []);
  const handleSchoolSearch = (searchTerm) => {
    if (searchTerm) {
      var debounced = _.debounce(() => {
        fetchSchool(searchTerm);
      }, 500);
      debounced();
    }
  };

  const children =
    school &&
    school.results &&
    school.results.length > 0 &&
    school.results.map((item, index) => {
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
          <div style={{ fontSize: 'small' }}> {item.schoolName}</div>
          <div style={{ fontSize: 'smaller' }}>
            {item.city}, {item.state} {item.zip}
          </div>
        </Option>
      );
    });

  return (
    <Select
      name='schoolSelect'
      showSearch={true}
      placeholder='Type School Name'
      onSearch={handleSchoolSearch}
      allowClear={true}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = (state) => ({
  school: state.school,
});
export default connect(mapStateToProps, {
  fetchSchool,
  clearAutoCompleteSchoolSearchResult,
})(AutoCompleteSchoolSearch);
