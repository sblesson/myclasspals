import React, { Fragment, useState } from 'react';
import { Formik } from 'formik';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import DisplayCreateInviteForm from './DisplayCreateInviteForm';

const CreateInviteForm = ({ setAlert }) => {
  const [isResultVisible, setIsResultVisible] = useState(false);
  const initialValues = {
    message:
      'We think you will really enjoy myclasspals, where school families unite. Join us to create more meaningful connection and improve school experience',
    inviteeEmail: '',
  };
  const handleSubmit = (formProps, actions) => {
    let { message, inviteeEmail } = formProps;

    let templateParams = {
      useremail: inviteeEmail,
      from_name: 'myclasspals',
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
          setAlert('Message send', 'success');
        },
        (error) => {
          setAlert(
            'Error occured while sending email invitation. Please try again later!',
            'error'
          );
        }
      );
    actions.resetForm();
    setIsResultVisible(true);
  };

  return (
    <Fragment>
      <h2 style={{ marginBottom: '1rem' }}>
        Invite your friends, acquaintance and family to join myclasspals
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

export default connect(null, {
  setAlert,
})(withRouter(CreateInviteForm));
