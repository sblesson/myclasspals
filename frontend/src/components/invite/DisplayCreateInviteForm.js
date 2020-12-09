import React from 'react';
import { Field } from 'formik';
import { Form } from 'formik-antd';
import { AntTextArea } from '../common/createformfields/CreateFormFields';

import { isRequired } from '../common/validatefields/ValidateFields';

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
        component={AntTextArea}
        name='inviteeEmail'
        type='text'
        label='Enter email addresses separated by coma'
        placeholder='Send email invitation to non members to join myclasspals group by typing or pasting email addresses, separated by commas'
        defaultValue={values.inviteeEmail}
        validate={isRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        component={AntTextArea}
        name='message'
        type='text'
        label='Message'
        placeholder='We think you will really enjoy myclasspals, where school families unite. Join us to create more meaningful connection and improve school experience'
        defaultValue={values.message}
        //validate={isRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <div className='submit-container'>
        <button className='ant-btn ant-btn-primary btn-primary' type='submit'>
          Submit
        </button>
      </div>
    </Form>
  );
};
