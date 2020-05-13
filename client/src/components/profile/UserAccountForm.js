import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Div } from 'glamorous';

import _ from 'lodash';
import { Formik, ErrorMessage } from 'formik';
import { ModalFooter } from 'reactstrap';

import { SubmitButton, Input, Form, FormItem } from 'formik-antd';
import AutoCompleteSchoolSearch from '../common/autocompleteschoolsearch/AutoCompleteSchoolSearch';
import AutoCompleteCitySeach from '../common/autocompletecitysearch/AutoCompleteCitySearch';

const UserAccountForm = ({ auth }) => {
  //const [formData, setFormData] = useState({ user });
  const validateRequired = value => {
    return value ? undefined : 'required';
  };
  const [componentSize, setComponentSize] = useState('small');
  const inputOnChange = event => {
    if (!event.target.value) {
      return;
    }
    console.log(event.target);
    //fetchSchools(event.target.value);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const yourInfo = (
    <Formik
      initialValues={{
        schoolName: '',
        city: ''
      }}
      onSubmit={(values, actions) => {
        console.log(actions);
        console.log(JSON.stringify(values));
      }}
      //validate={values => {}}
      render={() => (
        <div style={{ flex: 1, padding: 10 }}>
          <Form
            className='form-wrapper'
            {...formItemLayout}
            layout='vertical'
            initialValues={{
              size: componentSize
            }}
          >
            {auth && auth.user && auth.user.name === null ? (
              <FormItem name='name' label='Name'>
                <Div
                  position='relative'
                  css={{ paddingRight: '1.75em', width: '400px' }}
                >
                  <Input
                    name='userName'
                    placeholder='What should we call you?'
                  />
                </Div>
              </FormItem>
            ) : (
              ''
            )}

            <FormItem
              name='city'
              label='City'
              required={true}
              validate={validateRequired}
            >
              <AutoCompleteCitySeach />
            </FormItem>
            <FormItem name='schoolName' label='School' required={false}>
              {' '}
              <AutoCompleteSchoolSearch />
            </FormItem>
            <ModalFooter>
              <SubmitButton> Proceed</SubmitButton>
            </ModalFooter>
          </Form>
        </div>
      )}
    />
  );

  return <Fragment>{yourInfo}</Fragment>;
};

UserAccountForm.propTypes = {
  //profileData: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(withRouter(UserAccountForm));
