import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPrivateMessage } from '../../../actions/post';
import { updateGroup } from '../../../actions/group';

import { ModalFooter } from 'reactstrap';
import { Formik, ErrorMessage } from 'formik';

import { SubmitButton, Input, FormikDebug, Form, FormItem } from 'formik-antd';

import './CreateGroupModal.scss';

const GroupRulesForm = ({
  updateGroup,
  auth,
  group,
  newGroup,
  current,
  onStepChange,
  history
}) => {
  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onChange = e => {
    console.log(e.target.name, e.target.value);
  };

  const validateRequired = value => {
    return value ? undefined : 'required';
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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const groupRulesForm = (
    <Formik
      initialValues={{
        aboutGroup: '',
        groupRules: '',
        description: ''
      }}
      onSubmit={(values, actions) => {
        console.log(JSON.stringify(values));
        values.id = group.newGroup.id;

        updateGroup(JSON.stringify(values));
        actions.setSubmitting(false);
        actions.resetForm();
        debugger;
        if (newGroup) {
          window.location.pathname = '/group/' + group.newGroup.id;
        } else {
          window.location.reload();
        }
      }}
      validate={values => {}}
      render={() => (
        <div style={{ flex: 1, padding: 15 }}>
          <Form
            className='form-wrapper'
            {...formItemLayout}
            layout='vertical'
            initialValues={{
              size: componentSize
            }}
          >
            <FormItem
              name='aboutGroup'
              label='About Group'
              style={{ marginBottom: 16 }}
            >
              <Input
                name='aboutGroup'
                placeholder='What is this group about?'
              />
            </FormItem>
            <FormItem
              name='description'
              label='Additional Details'
              style={{ marginBottom: 16 }}
            >
              <Input
                name='description'
                placeholder='More details about this group ...'
              />
            </FormItem>
            <FormItem name='groupRules' label='Group Rules'>
              <Input.TextArea
                className='post-form-text-input post-form-textarea'
                name='groupRules'
                cols='50'
                rows='10'
                placeholder='Start with the right tone by sharing your purpose and rules for your group?'
                onChange={e => onChange(e)}
                required
              />{' '}
            </FormItem>

            <ModalFooter>
              <SubmitButton className='ant-btn btn-primary send-post-btn'>
                {' '}
                Post
              </SubmitButton>
            </ModalFooter>
          </Form>
        </div>
      )}
    />
  );
  return <Fragment>{groupRulesForm}</Fragment>;
};

const mapDispatchToProps = state => ({
  auth: state.auth,
  group: state.group
});

export default connect(mapDispatchToProps, {
  updateGroup,
  mapDispatchToProps
})(withRouter(GroupRulesForm));
