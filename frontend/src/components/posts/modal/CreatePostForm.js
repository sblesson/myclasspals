import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import DisplayCreatePostForm from './DisplayCreatePostForm';

const CreatePostForm = ({ group, setModal, addPost }) => {
  const initialValues = {
    categoryId: 'General',
    groupId: group.currentGroup.id,
    subject: '',
    message: '',
    categoryOptions: ['Have Question', 'Homework', 'Tutoring', 'Help Needed'],
  };
  const handleSubmit = (formProps) => {
    console.log(formProps);
    let { subject, message, categoryId, groupId } = formProps;

    let formObj = {
      subject: subject,
      message: message,
      categoryId: categoryId,
      groupId: groupId,
    };
    console.log('from addpost');
    addPost(JSON.stringify(formObj), (response) => {
      setModal(false);
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
});

export default connect(mapStateToProps, {
  addPost,
})(withRouter(CreatePostForm));
