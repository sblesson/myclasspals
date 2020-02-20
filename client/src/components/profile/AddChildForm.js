import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import downshift from 'downshift';
import DownshiftTwo from './DownshiftTwo';
import _ from 'lodash';

import { createProfile, getCurrentProfile } from '../../actions/profile';

import {
  Input,
  Grid,
  Select,
  Radio,
  Form,
  Button,
  Checkbox,
  Search
} from 'semantic-ui-react';
import './AddChildForm.scss';
import Downshift from 'downshift';

const AddChildForm = ({ community }) => {
  const [formData, setFormData] = useState({});
  const items = [
    { value: 'apple' },
    { value: 'pear' },
    { value: 'orange' },
    { value: 'grape' },
    { value: 'banana' }
  ];

  const yourInfo =
    community !== null &&
    community.length > 0 &&
    community.map((childData, index) => (
      <div key={index}>
        <Form>
          <Form.Field
            control={Input}
            placeholder='Child Name'
            name='childName'
            defaultValue={childData.childName}
            onChange={e => onChange(e, childData)}
            required
          />
          <Form.Field>
            <DownshiftTwo></DownshiftTwo>
            {/*      <Search
              fluid
                  //loading={isLoading}
          //onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          {...this.props} 
            /> */}
          </Form.Field>

          {/*       <Form.Field widths='equal'>
        <Form.Select
          fluid
          //options={userData.address.state}
          placeholder='Gender'
        />
      </Form.Field> */}
          <Form.Field
            control={Input}
            placeholder='Grade'
            name='grade'
            defaultValue={childData.grade}
            onChange={e => onChange(e, childData)}
          />
          <Form.Field
            control={Input}
            placeholder='Class Room'
            name='classroom'
            defaultValue={childData.classroom}
            onChange={e => onChange(e, childData)}
          />
        </Form>
      </div>
    ));
  /*   <Button
      color='pink'
      onClick={e => {
        e.preventDefault();
        //addSchool(formData, history);
      }}
    >
      Add + child
    </Button> */
  const onChange = (e, childData) => {
    childData[e.target.name] = e.target.value;
  };

  return <Fragment>{yourInfo}</Fragment>;
};

AddChildForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  community: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  isLoading: state.schools.isLoading
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile
})(withRouter(AddChildForm));
