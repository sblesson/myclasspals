import React from 'react';
import { connect } from 'react-redux';

/** Modal Components */
import ProfileModal from '../../components/modal/ProfileModal';
import PostModal from '../../components/modal/PostModal';

/** Modal Type Constants */
import { export const POST_MODAL = 'POST_MODAL';
, PROFILE_MODAL } from './modaltypes';

const MODAL_COMPONENTS = {
  //LOGIN_MODAL: LoginModal,
  //SIGNUP_MODAL: SignupModal,
  POST_MODAL: PostModal
};

const ModalRoot = props => {
  if (!props.modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[props.modalType];

  return <SpecificModal />;
};

const mapStateToProps = state => {
  return {
    modalType: state.modal.modalType
  };
};

export default connect(mapStateToProps)(ModalRoot);
