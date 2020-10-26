import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import DisplayCreateInviteForm from './DisplayCreateInviteForm';

const CreateInviteForm = ({ group, setModal, addPost }) => {
  const initialValues = {
    message:
      'We think you will really enjoy clazzbuddy, where school families unite. Join us to create more meaningful connection and improve school experience',
    inviteeEmail: '',
  };
  const handleSubmit = (formProps) => {
    console.log(formProps);
    let { message, inviteeEmail } = formProps;

    let formObj = {
      message,
      inviteeEmail,
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
      render={DisplayCreateInviteForm}
    />
  );
};

DisplayCreateInviteForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, {
  addPost,
})(withRouter(CreateInviteForm));
