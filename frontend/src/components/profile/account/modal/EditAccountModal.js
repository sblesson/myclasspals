import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateUser } from '../../../../actions/auth';
import { Modal } from 'antd';

import { Formik, ErrorMessage } from 'formik';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';

import AutoCompleteCitySeach from '../../../common/autocompletecitysearch/AutoCompleteCitySearch';

const EditAccountModal = ({ auth, updateUser }) => {
  const [visible, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = () => {
    setModalVisibility(!visible);
  };
  //const [formData, setFormData] = useState({ user });
  const validateRequired = value => {
    return value ? undefined : 'required';
  };
  const [componentSize, setComponentSize] = useState('small');
  const inputOnChange = event => {
    if (!event.target.value) {
      return;
    }
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
        email: auth.user.email,
        name: '',
        city: '',
        state: '',
        zipcode: ''
      }}
      onSubmit={values => {
        let myAddress = JSON.parse(values.citySelect);

        updateUser(
          {
            email: auth.user.email,
            name: values.userName,
            city: myAddress.city,
            state: myAddress.state,
            zipcode: myAddress.postalcode
          },
          true
        );
        setModalVisibility(false);
      }}
      validator={() => ({})}
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
            {auth !== null && auth.user ? (
              <FormItem name='userName'>
                <Input name='userName' placeholder={auth.user.name} />
              </FormItem>
            ) : (
              ''
            )}
            <FormItem name='city'>
              <AutoCompleteCitySeach />
            </FormItem>
            <SubmitButton className='ant-btn btn-primary'> Update</SubmitButton>
          </Form>

          {/*      <pre style={{ flex: 1 }}>
            <FormikDebug />
          </pre> */}
        </div>
      )}
    />
  );

  return (
    <Fragment>
      {' '}
      <div className='account-info-action-container' onClick={toggleModal}>
        <div
          style={{
            float: 'right',
            fontSize: '12px',
            cursor: 'pointer',
            marginTop: '12px',
            marginRight: '10px'
          }}
        >
          <span>Edit</span>
        </div>
      </div>
      <Modal
        title={'Edit My Account'}
        centered
        visible={visible}
        onOk={hideModal}
        okText='Post'
        onCancel={toggleModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
        footer={null}
      >
        {yourInfo}
      </Modal>
    </Fragment>
  );
};

EditAccountModal.propTypes = {
  //profileData: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  updateUser
})(withRouter(EditAccountModal));
