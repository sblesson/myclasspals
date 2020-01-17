import React, { useState } from 'react';
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
import './ProfileModal.scss';

const ProfileModal = ({ addSchool, history }) => {
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

  const [initialState, setSchool] = useState({
    isLoading: false,
    results: [],
    value: ''
  });

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

  const handleResultSelect = (e, { result }) =>
    setInitialState({ ...initialState, ['value']: result.title });

  const handleSearchChange = (e, { value }) => {
    console.log(value, initialState);
    setInitialState({ ...initialState, ['isLoading']: true, ['value']: value });
    setTimeout(() => {
      if (initialState.value.length < 1)
        return setInitialState({
          isLoading: false,
          results: [],
          value: ''
        });

      const re = new RegExp(_.escapeRegExp(initialState.value), 'i');
      const isMatch = result => re.test(result.title);

      setInitialState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
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
                    loading={initialState.isLoading}
                    onResultSelect={handleResultSelect}
                    onSearchChange={_.debounce(handleSearchChange, 500, {
                      leading: true
                    })}
                    results={initialState.results}
                    value={initialState.value}
                    resultRenderer={resultRenderer}
                  />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Segment>
                    <Header>State</Header>
                    <pre style={{ overflowX: 'auto' }}></pre>
                    <Header>Options</Header>
                  </Segment>
                </Grid.Column>
              </Grid>

              <Input
                placeholder='Type School Name'
                name='schoolName'
                onChange={e => onChange(e)}
                required
              />
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
  addSchool: PropTypes.func.isRequired
};

export default connect(null, { addSchool })(withRouter(ProfileModal));
