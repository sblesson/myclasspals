import React from 'react';
import { Form, Field } from 'formik';
import {
  AntInput,
  AntTextArea,
  AntSelect,
} from '../../common/CreateAntFields/CreateAntFields';

import { isRequired } from '../../common/ValidateFields/ValidateFields';

export default ({ handleSubmit, values, submitCount }) => (
  <Form className='form-container' onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name='subject'
      type='text'
      label='Subject'
      defaultValue={values.subject}
      //validate={validateEmail}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntSelect}
      name='categoryId'
      label='Post Category'
      defaultValue={values.postCategorySelectOptions}
      selectOptions={values.selectOptions}
      validate={isRequired}
      submitCount={submitCount}
      tokenSeparators={[',']}
      style={{ width: 200 }}
      hasFeedback
    />
    <Field
      component={AntTextArea}
      name='message'
      type='text'
      label='Message'
      defaultValue={values.message}
      submitCount={submitCount}
      hasFeedback
    />

    <div className='submit-container'>
      <button className='ant-btn ant-btn-primary' type='submit'>
        Submit
      </button>
    </div>
  </Form>
);
