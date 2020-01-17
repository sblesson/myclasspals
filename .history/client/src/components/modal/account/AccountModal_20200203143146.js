import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Search, Input, Grid, Header, Segment, Label } from 'semantic-ui-react';
import _ from 'lodash';

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSchool } from '../../../actions/profile';
import { getSchoolData } from '../../../actions/school';
import './AccountModal.scss';

const ProfileModal = ({
  addSchool,
  history,
  getSchoolData,
  results,
  isLoading,
  value
}) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolCity: '',
    schoolState: '',
    schoolZip: '',
    grade: '',
    classRoom: '',
    childName: ''
  });

  const [modal, setModal] = useState(false);
  /* 
  useEffect(() => {
    getSchoolData();
  }, [getSchoolData]); */

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
    schoolName: PropTypes.string,
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
        Edit
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>{'Edit Account'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className='account-form'>
              <Input
                placeholder='Your name'
                name='username'
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='account-form'>
              <Grid>
                <Grid.Column width={6}>
                  <Search
                    placeholder='Type school name'
                    loading={isLoading}
                    onResultSelect={handleResultSelect}
                    onBlur={_.debounce(handleSearchOnBlur, 500, {
                      leading: true
                    })}
                    results={results}
                    value={value}
                    resultRenderer={resultRenderer}
                    name='schoolName'
                    //onChange={e => onChange(e)}
                  />
                </Grid.Column>
              </Grid>
            </FormGroup>
            <FormGroup className='account-form'>
              <Input
                className='account-form-text-input'
                type='text'
                name='grade'
                //value={grade}
                placeholder='* Grade'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='account-form'>
              <Input
                className='account-form-text-input'
                type='text'
                name='classRoom'
                //value={classRoom}
                placeholder='Class Room'
                onChange={e => onChange(e)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={e => {
              e.preventDefault();
              addSchool(formData, history);
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ProfileModal.propTypes = {
  addSchool: PropTypes.func.isRequired,
  getSchoolData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    results: state.school.results,
    isLoading: state.school.isLoading,
    value: state.school.value
  };
};

export default connect(mapStateToProps, { addSchool, getSchoolData })(
  withRouter(ProfileModal)
);
