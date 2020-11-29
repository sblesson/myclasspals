import React, { Fragment } from 'react';
import { Formik } from 'formik';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import DisplayCreateInviteForm from './DisplayCreateInviteForm';

const CreateInviteForm = ({ group, setModal }) => {
  const initialValues = {
    message:
      'We think you will really enjoy clazzbuddy, where school families unite. Join us to create more meaningful connection and improve school experience',
    inviteeEmail: '',
  };
  const handleSubmit = (formProps) => {
    console.log(formProps);
    let { message, inviteeEmail } = formProps;

    console.log(window.emailjs);
    let templateParams = {
      from_name: 'support@clazzbuddy.com',
      to_name: inviteeEmail,
      subject: 'You have a new invitation',
      message_html: message,
    };
    window.emailjs
      .send(
        'default_service',
        'template_invite',
        templateParams,
        'user_lol6VvJrSdlG57bHeWx0I'
      )
      .then(
        (result) => {
          console.log(result.text);
          setModal(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Fragment>
      <h2 style={{ marginBottom: '1rem' }}>
        Invite your friends, acquaintance and family to join classpalz
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={DisplayCreateInviteForm}
      />
    </Fragment>
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
