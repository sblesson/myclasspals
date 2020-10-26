import React from 'react';
import { Field } from 'formik';
import { FormikDebug } from 'formik-antd';
import { Form } from 'formik-antd';
import {
  dateFormat,
  timeFormat,
  AntDatePicker,
  AntInput,
  AntTextArea,
  AntSelect,
  AntTimePicker,
} from '../../common/createformfields/CreateFormFields';
import PostCategorySelect from '../../common/postcategoryselect/PostCategorySelect';
import CATEGORIES from '../../../const/CATEGORIES';

import {
  validateDate,
  isRequired,
} from '../../common/validatefields/ValidateFields';

export default ({ handleSubmit, values, submitCount }) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return (
    <Form
      className='form-container'
      /*  className='form-wrapper' */
      {...formItemLayout}
      layout='vertical'
      initialValues={{
        size: 'small',
      }}
      onSubmit={handleSubmit}
    >
      <Field
        component={AntSelect}
        name='categoryId'
        label='Category'
        defaultValue={values.categoryId}
        selectOptions={values.categoryOptions}
        validate={isRequired}
        submitCount={submitCount}
        tokenSeparators={[',']}
        style={{ width: 200 }}
        hasFeedback
      />
      <Field
        component={AntInput}
        name='subject'
        type='text'
        label='Subject'
        placeholder='What is it about?'
        defaultValue={values.subject}
        validate={isRequired}
        submitCount={submitCount}
        hasFeedback
      />

      <Field
        component={AntTextArea}
        name='message'
        type='text'
        label='Message'
        placeholder='Type your message'
        defaultValue={values.eventDescription}
        //validate={isRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <div className='submit-container'>
        <button className='ant-btn ant-btn-primary btn-primary' type='submit'>
          Submit
        </button>
      </div>
      <pre style={{ flex: 1 }}>
        <FormikDebug />
      </pre>
    </Form>
  );
};
