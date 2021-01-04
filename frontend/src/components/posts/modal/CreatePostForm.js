import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import DisplayCreatePostForm from './DisplayCreatePostForm';

const CreatePostForm = ({
  group,
  hideModal,
  addPost,
  post: { categories },
}) => {
  const initialValues = {
    categoryId: 'General',
    groupId: group.currentGroup.id,
    subject: '',
    message: '',
    categoryOptions: categories,
    fileList: [],
  };
  const handleSubmit = (formProps) => {
    let { subject, message, categoryId, groupId } = formProps;

    let formObj = {
      subject: subject,
      message: message,
      categoryId: categoryId,
      groupId: groupId,
    };
    if (initialValues.fileList && initialValues.fileList.length > 0) {
      formObj.fileList = initialValues.fileList;
    }
    addPost(JSON.stringify(formObj), () => {
      hideModal(false);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={DisplayCreatePostForm}
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
