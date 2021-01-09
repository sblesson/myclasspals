import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { FormikDebug, Form, FormItem } from 'formik-antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  AntInput,
  AntTextArea,
  AntSelect,
} from '../../common/createformfields/CreateFormFields';

import { isRequired } from '../../common/validatefields/ValidateFields';

const CreatePostForm = ({
  group,
  hideModal,
  addPost,
  post: { categories },
}) => {
  const [fileUploadStatus, setFileUploadStatus] = useState('');
  const [fileUploadList, setFileUploadList] = useState([]);
  const [initialValues, setInitialValues] = useState({
    categoryId: 'General',
    groupId: group.currentGroup.id,
    subject: '',
    message: '',
    categoryOptions: categories,
  });

  useEffect(() => {
    return () => {
      setInitialValues({
        categoryId: 'General',
        groupId: group.currentGroup.id,
        subject: '',
        message: '',
        categoryOptions: categories,
      });
      setFileUploadList([]);
      setFileUploadStatus(''); // This worked for me
    };
  }, []);

  const handleSubmit = (values, actions) => {
    let { subject, message, categoryId, groupId } = values;

    let formObj = {
      subject: subject,
      message: message,
      categoryId: categoryId,
      groupId: groupId,
    };
    setTimeout(() => {
      if (fileUploadList && fileUploadList.length > 0) {
        formObj.fileList = fileUploadList;
      }
      actions.setSubmitting(false);
      addPost(JSON.stringify(formObj), () => {
        hideModal(false);
      });
    }, 1000);
  };

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
      setFileUploadStatus(status);

      if (status !== 'uploading') {
        //console.log(info.file, info.fileList);
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
        setFileUploadList(myFile);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={() => (
        <Form
          className='form-container'
          {...formItemLayout}
          layout='vertical'
          initialValues={{
            size: 'small',
          }}
        >
          <Field
            component={AntSelect}
            name='categoryId'
            label='Category'
            defaultValue={initialValues.categoryId}
            selectOptions={initialValues.categoryOptions}
            validate={isRequired}
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
            defaultValue={initialValues.subject}
            validate={isRequired}
            hasFeedback
          />

          <Field
            component={AntTextArea}
            name='message'
            type='text'
            label='Message'
            placeholder='Type your message'
            defaultValue={initialValues.eventDescription}
            //validate={isRequired}
            hasFeedback
          />
          <FormItem name='fileUpload' label='' required={false}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />} className='image-upload'>
                Upload photo
              </Button>
            </Upload>
          </FormItem>

          <div className='submit-container'>
            <button
              className='ant-btn ant-btn-primary btn-primary'
              type='submit'
              disabled={fileUploadStatus === 'uploading' ? true : false}
            >
              Submit
            </button>
          </div>
          {/*     <pre style={{ flex: 1 }}>
          <FormikDebug />
        </pre> */}
        </Form>
      )}
    />
  );
};

CreatePostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  group: state.group,
  post: state.post,
});

export default connect(mapStateToProps, {
  addPost,
})(withRouter(CreatePostForm));
