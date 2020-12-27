import React, { useState } from 'react';
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
  const [fileList, setFileList] = useState([]);

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
    multiple: false,
    action: 'https://api.cloudinary.com/v1_1/myclasspals/image/upload',
    data: { upload_preset: 'ooh34j0k' },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        let myFile = [];
        for (let i = 0; i < info.fileList.length; i++) {
          const {
            original_extension,
            original_filename,
            secure_url,
          } = info.fileList[i].response;
          myFile.push({
            fileName: original_filename + '.' + original_extension,
            url: secure_url,
          });
        }
        values.fileList = myFile;
        console.log(values.fileList);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const submitFormWithDelay = () => {
    setTimeout(() => handleSubmit, 5000);
  };
  return (
    <Form
      className='form-container'
      {...formItemLayout}
      layout='vertical'
      initialValues={{
        size: 'small',
      }}
      onSubmit={submitFormWithDelay}
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
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
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
