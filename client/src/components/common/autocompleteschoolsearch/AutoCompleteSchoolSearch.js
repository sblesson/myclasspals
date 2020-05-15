import React from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';
import { getSchoolData } from '../../../actions/school';
import './AutoCompleteSchoolSearch.scss';

const AutoCompleteSchoolSearch = ({ getSchoolData, school }) => {
  const Option = AutoComplete.Option;

  const handleSchoolSearch = searchTerm => {
    if (searchTerm) {
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
    <AutoComplete
      allowClear={true}
      backfill={true}
      style={{ width: '100%' }}
      onSelect={onSchoolSelect}
      onSearch={handleSchoolSearch}
      placeholder='School name'
      name='schoolName'
    >
      {children}
    </AutoComplete>
  );
};
const mapStateToProps = state => ({
  school: state.school
});
export default connect(mapStateToProps, { getSchoolData })(
  AutoCompleteSchoolSearch
);
