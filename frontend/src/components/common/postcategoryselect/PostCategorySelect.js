import React from 'react';
import { Select } from 'formik-antd';
import CATEGORIES from '../../../const/CATEGORIES';

const PostCategorySelect = () => {
  const Option = Select.Option;
  const children =
    CATEGORIES &&
    CATEGORIES.length > 0 &&
    CATEGORIES.map((item, index) => {
      return (
        <Option key={index} value={item.title}>
          {item.title}
        </Option>
      );
    });

  return (
    <Select name='categoryId' style={{ width: '100%' }} placeholder='Select'>
      {children}
    </Select>
  );
};

export default PostCategorySelect;
