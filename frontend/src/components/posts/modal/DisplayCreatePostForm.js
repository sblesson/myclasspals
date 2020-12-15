import React from 'react';
import { Field } from 'formik';
import { FormikDebug } from 'formik-antd';
import { Form } from 'formik-antd';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import {
  AntInput,
  AntTextArea,
  AntSelect,
} from '../../common/createformfields/CreateFormFields';

import { isRequired } from '../../common/validatefields/ValidateFields';

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
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
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
      {/*      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload> */}
      <div className='submit-container'>
        <button className='ant-btn ant-btn-primary btn-primary' type='submit'>
          Submit
        </button>
      </div>
      {/*     <pre style={{ flex: 1 }}>
        <FormikDebug />
      </pre> */}
    </Form>
  );
};
