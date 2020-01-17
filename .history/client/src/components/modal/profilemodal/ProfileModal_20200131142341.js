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
import './ProfileModal.scss';

const ProfileModal = ({ addSchool, history, getSchoolData, schoolData }) => {
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

  const source = _.times(5, () => ({
    title: 'warm',
    description: 'cute',
    price: 'uddu'
  }));

  const resultRenderer = ({ title }) => <Label content={title} />;

  resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
  };

  const toggle = () => setModal(!modal);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleResultSelect = (e, { result }) => {
    setFormData({ ...formData, ['schoolName']: result.title });
  };

  const handleSearchChange = (e, { value }) => {
    console.log(value, schoolData);
    //  setSchoolData({ ...schoolData, ['isLoading']: true, ['value']: value });
    setTimeout(() => {
      if (!searchTerm) {
        let schoolData = {
          isLoading: false,
          results: [],
          error: {}
        };
      }
      getSchoolData(searchTerm);
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
                    //loading={schoolData.isLoading}
                    onResultSelect={handleResultSelect}
                    onSearchChange={_.debounce(handleSearchChange, 500, {
                      leading: true
                    })}
                    //results={schoolData.results}
                    //value={schoolData.value}
                    //resultRenderer={resultRenderer}
                    name='schoolName'
                    onChange={e => onChange(e)}
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

ProfileModal.propTypes = {
  addSchool: PropTypes.func.isRequired,
  getSchoolData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    schoolData: state.schoolData
  };
};

export default connect(mapStateToProps, { addSchool, getSchoolData })(
  withRouter(ProfileModal)
);
