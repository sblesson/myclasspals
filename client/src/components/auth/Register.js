import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { getSchoolData } from '../../actions/school';
import {
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon
} from './DownshiftComponents';
import { Div } from 'glamorous';

import PropTypes from 'prop-types';
import Downshift from 'downshift';

const Register = ({
  setAlert,
  register,
  isAuthenticated,
  getSchoolData,
  schools
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  const inputOnChange = event => {
    console.log(event.target.value);
    if (!event.target.value) {
      return;
    }
    fetchSchools(event.target.value);
  };

  const fetchSchools = searchTerm => {
    setTimeout(() => {
      getSchoolData(searchTerm);
    }, Math.random() * 1000);
  };

  const schoolNameSelectHandler = selectedItem => {
    console.log(selectedItem);
    //community[index].schoolid = selectedItem.schoolid;
  };

  const schoolNameToString = (item, index) => {
    console.log(item);
    //community[index].school = item;
    //if (item) setGradeOptions(item.lowGrade, item.highGrade);
    return item ? item.schoolName : '';
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <Downshift
            onChange={selectedItem => schoolNameSelectHandler(selectedItem)}
            itemToString={schoolNameToString}
          >
            {({
              getInputProps,
              getToggleButtonProps,
              getItemProps,
              isOpen,
              toggleMenu,
              clearSelection,
              selectedItem,
              inputValue,
              getLabelProps,
              highlightedIndex
            }) => (
              <div className='auto-container'>
                <Div position='relative' css={{ paddingRight: '1.75em' }}>
                  <Input
                    {...getInputProps({
                      placeholder:
                        'Type school or district or an address, city, zip...',
                      onKeyUp: inputOnChange
                    })}
                  />
                  {selectedItem ? (
                    <ControllerButton
                      css={{ paddingTop: 4, top: 5 }}
                      onClick={clearSelection}
                      aria-label='clear selection'
                    >
                      <XIcon />
                    </ControllerButton>
                  ) : (
                    <ControllerButton {...getToggleButtonProps()}>
                      <ArrowIcon isOpen={isOpen} />
                    </ControllerButton>
                  )}
                </Div>
                {isOpen ? (
                  <Menu>
                    {schools.map((item, index) => (
                      <Item
                        key={item.schoolid}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItem === item
                        })}
                      >
                        {item.schoolName}
                      </Item>
                    ))}
                  </Menu>
                ) : null}
              </div>
            )}
          </Downshift>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.school.isLoading,
  schools: state.school.results,
  isSchoolLoading: state.school.isLoading
});

export default connect(mapStateToProps, { setAlert, register, getSchoolData })(
  Register
);
