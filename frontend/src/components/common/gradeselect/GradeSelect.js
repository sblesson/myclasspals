import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'formik-antd';
import GRADES from '../../../const/Grades';

const GradeSelect = () => {
  const Option = Select.Option;

  const children =
    GRADES &&
    GRADES.length > 0 &&
    GRADES.map(item => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.title}
        </Select.Option>
      );
    });

  return (
    <Select
      name='grade'
      style={{ width: '100%' }}
      placeholder='Click to  select'
    >
      {children}
    </Select>
  );
};

export default GradeSelect;
