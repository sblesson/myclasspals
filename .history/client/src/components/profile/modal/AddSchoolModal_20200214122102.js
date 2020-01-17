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
import { addSchool } from '../../../actions/';
import { getSchoolData } from '../../../../actions/school';
import './SchoolModal.scss';

const AddSchoolModal = ({
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
        <div className='profile-action-button'>
          <i className='fas fa-plus-circle'></i>
          <span className='add-more'>Add more child?</span>
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {"Connect to your child's class community"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className='post-form'>
              <Input
                placeholder='Name of Child'
                name='childName'
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='post-form'>
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
            <FormGroup className='post-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='grade'
                //value={grade}
                placeholder='* Grade'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='post-form'>
              <Input
                className='post-form-text-input'
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

AddSchoolModal.propTypes = {
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
  withRouter(AddSchoolModal)
);
