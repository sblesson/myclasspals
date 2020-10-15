import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPrivateMessage } from '../../actions/post';
import { updateGroup } from '../../actions/group';

import { Formik, ErrorMessage } from 'formik';

import { SubmitButton, Input, FormikDebug, Form, FormItem } from 'formik-antd';

import './CreateGroupModal.scss';

const GroupRulesForm = ({
  updateGroup,
  auth,
  group,
  isNewGroup,
  current,
  onStepChange,
  history,
  setModal,
}) => {
  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const closeModalAndredirectToGroupPage = (actions) => {
    if (actions) {
      actions.setSubmitting(false);
      actions.resetForm();
    }

    onStepChange(0);
    setModal(false);
    if (group && group.newGroup && group.newGroup.id) {
      history.push('/dashboard/' + group.newGroup.id);
      window.location.reload();
    }
  };

  const groupRulesForm = (
    <Formik
      initialValues={{
        aboutGroup: '',
        groupRules: '',
      }}
      onSubmit={(values, actions) => {
        values.id = group.newGroup.id;
        if (values.aboutGroup || values.groupRules) {
          updateGroup(values, () => {
            closeModalAndredirectToGroupPage(actions);
          });
        } else {
          closeModalAndredirectToGroupPage(actions);
        }
      }}
      validate={(values) => {}}
      render={() => (
        <div style={{ flex: 1, padding: 15 }}>
          {isNewGroup ? (
            <div>
              {' '}
              <Button
                type='link'
                style={{ float: 'right' }}
                onClick={(e) => closeModalAndredirectToGroupPage()}
              >
                Skip
              </Button>
              <br />
            </div>
          ) : (
            ''
          )}

          <Form
            className='form-wrapper'
            {...formItemLayout}
            layout='vertical'
            initialValues={{
              size: componentSize,
            }}
          >
            <FormItem
              name='aboutGroup'
              label='About Group'
              style={{ marginBottom: 16 }}
              required={false}
            >
              <Input
                name='aboutGroup'
                placeholder='What is this group about?'
              />
            </FormItem>

            <FormItem name='groupRules' label='Group Rules' required={false}>
              <Input.TextArea
                className='post-form-text-input post-form-textarea'
                name='groupRules'
                cols='50'
                rows='10'
                placeholder='Start with the right tone by sharing your purpose and rules for your group?'
              />{' '}
            </FormItem>

            <SubmitButton className='ant-btn btn-primary send-post-btn'>
              {' '}
              Post
            </SubmitButton>
          </Form>
        </div>
      )}
    />
  );
  return <Fragment>{groupRulesForm}</Fragment>;
};

const mapDispatchToProps = (state) => ({
  auth: state.auth,
  group: state.group,
});

export default connect(mapDispatchToProps, {
  updateGroup,
  mapDispatchToProps,
})(withRouter(GroupRulesForm));
