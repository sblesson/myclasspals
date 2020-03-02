import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddChildForm from '../AddChildForm';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCommunity } from '../../../actions/profile';
import { getSchoolData } from '../../../actions/school';
import './SchoolModal.scss';

const AddSchoolModal = ({
  updateCommunity,
  history,
  getSchoolData,
  results,
  isLoading,
  value
}) => {
  const [formData, setFormData] = useState({
    displayname: 'sdfadf',
    grade: 'sdfasdf',
    classroom: 'fasdf',
    schoolid: 'sdaff'
  });

  const community = [
    {
      displayname: '',
      grade: '',
      classroom: '',
      schoolid: ''
    }
  ];
  const [modal, setModal] = useState(false);

  const resultRenderer = ({ schoolid, schoolName, city, state, zip }) => (
    <div class='content' key={{ schoolid }}>
      <div class='title'>{schoolName}</div>
      <div class='description'>
        {city}, {state} {zip}
      </div>
    </div>
  );
  resultRenderer.propTypes = {
    schoolid: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string
  };

  const toggle = () => setModal(!modal);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleResultSelect = (e, { result }) => {
    setFormData({ ...formData, ['schoolName']: result.title });
  };

  const handleSearchOnBlur = event => {
    value = event.target && event.target.value ? event.target.value : '';
    setTimeout(() => {
      isLoading = false;

      if (value) {
        getSchoolData(value);
      }
    }, 300);
  };

  return (
    <div>
      <div className='new-post-form' onClick={toggle}>
        <div className='profile-action-button'>
          <i className='fas fa-plus-circle'></i>
          <span className='add-more'>Add your child&#39;s class?</span>
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {"Connect to your child's class community"}
        </ModalHeader>
        <ModalBody>
          <AddChildForm community={community} />
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={e => {
              e.preventDefault();
              updateCommunity(formData, history);
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

AddSchoolModal.propTypes = {
  updateCommunity: PropTypes.func.isRequired,
  getSchoolData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    //results: state.school.results,
    //isLoading: state.school.isLoading,
    //value: state.school.value
  };
};

export default connect(mapStateToProps, { updateCommunity, getSchoolData })(
  withRouter(AddSchoolModal)
);
