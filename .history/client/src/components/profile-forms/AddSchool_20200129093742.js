import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSchool } from '../../actions/profile';
import SelectSearch from 'react-select-search';



import _ from 'lodash'
import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

const ModalExampleScrollingContent = () => (
  <Modal trigger={<Button>Scrolling Content Modal</Button>}>
    <Modal.Header>Add your child </Modal.Header>
    <Modal.Content image scrolling>
      <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />

      <Modal.Description>
        <Header>Modal Header</Header>
        <p>
          This is an example of expanded content that will cause the modal's
          dimmer to scroll
        </p>

        {_.times(8, (i) => (
          <Image
            key={i}
            src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
            style={{ paddingBottom: 5 }}
          />
        ))}
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='chevron right' />
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalExampleScrollingContent


const AddSchool = ({ addSchool, history }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    /*     schoolCity: '',
    schoolState: '', */
    grade: '',
    classRoom: '',
    childName: ''
  });

  const {
    schoolName,
    schoolCity,
    schoolState,
    grade,
    classRoom,
    childName
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const gradeOptions = [
    { name: 'PK', value: 'pk' },
    { name: 'KG', value: '0' },
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
    { name: '6', value: '6' },
    { name: '7', value: '7' }
  ];
  const classroomOptions = [
    { name: 'Sunshine', value: 'sv' },
    { name: 'Moonshine', value: 'en' },
    { name: '34', value: '34' }
  ];

  return (
    <Fragment>
      <p>
        <i className='fas fa-code-branch' /> Edit/Add school your child's school
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addSchool(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Name of Child'
            name='childName'
            value={childName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School Name'
            name='schoolName'
            value={schoolName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Grade'
            name='grade'
            value={grade}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <SelectSearch
          options={gradeOptions}
          value=''
          placeholder='Choose grade'
        />
        <SelectSearch
          options={classroomOptions}
          value=''
          placeholder='Choose classroom'
        />
        <div className='form-group'>
          <input
            type='text'
            placeholder='Class Room'
            name='classRoom'
            value={classRoom}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddSchool.propTypes = {
  addSchool: PropTypes.func.isRequired
};

export default connect(null, { addSchool })(withRouter(AddSchool));
